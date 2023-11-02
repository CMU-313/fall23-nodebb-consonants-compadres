"use strict";

const db = require("../database");
const user = require("../user");
const privileges = require("../privileges");

module.exports = function (Posts) {
    /**
     * Endorse a post.
     *
     * @param {number} pid - The ID of the post to endorse.
     * @param {number} uid - The user ID endorsing the post.
     * @returns {Promise<Object>} An object representing the endorsement action.
     */
    Posts.endorse = async function (pid, uid) {
        console.assert(typeof pid === "number", "pid should be a number");
        console.assert(typeof uid === "number", "uid should be a number");

        const canEndorse = await privileges.posts.can(
            "posts:endorse",
            pid,
            uid,
        );
        if (!canEndorse) {
            throw new Error("[[error:no-privileges]]");
        }
        return await toggleEndorse("endorse", pid, uid);
    };

    /**
     * Toggle an endorsement action.
     *
     * @param {string} type - The type of endorsement action (e.g., 'endorse').
     * @param {number} pid - The ID of the post to toggle endorsement for.
     * @param {number} uid - The user ID performing the endorsement action.
     * @returns {Promise<Object>} An object representing the endorsement action.
     */
    async function toggleEndorse(type, pid, uid) {
        console.assert(typeof type === "string", "type should be a string");
        console.assert(typeof pid === "number", "pid should be a number");
        console.assert(typeof uid === "number", "uid should be a number");

        const endorseStatus = await Posts.hasEndorsed(pid, uid);
        await unendorse(pid, uid, type, endorseStatus);
        return await endorse(type, false, pid, uid, endorseStatus);
    }

    /**
     * Unendorse a post.
     *
     * @param {number} pid - The ID of the post to unendorse.
     * @param {number} uid - The user ID unendorsing the post.
     * @param {string} type - The type of endorsement action (e.g., 'endorse').
     * @param {Object} endorseStatus - The endorsement status object.
     * @returns {Promise<Object|undefined>} An object representing the unendorsement action, or undefined if not applicable.
     */
    async function unendorse(pid, uid, type, endorseStatus) {
        console.assert(typeof pid === "number", "pid should be a number");
        console.assert(typeof uid === "number", "uid should be a number");
        console.assert(typeof type === "string", "type should be a string");
        console.assert(
            typeof endorseStatus === "object",
            "endorseStatus should be an object",
        );

        if (!endorseStatus || !endorseStatus.endorsed) {
            return;
        }

        return await endorse("endorse", true, pid, uid, endorseStatus);
    }

    /**
     * Perform an endorsement action on a post.
     *
     * @param {string} type - The type of endorsement action (e.g., 'endorse').
     * @param {boolean} unendorse - Whether the action is an unendorsement (true) or endorsement (false).
     * @param {number} pid - The ID of the post the endorsement action is performed on.
     * @param {number} uid - The user ID performing the endorsement action.
     * @param {Object} endorseStatus - The endorsement status object.
     * @returns {Promise<Object>} An object representing the endorsement action.
     */
    async function endorse(type, unendorse, pid, uid, endorseStatus) {
        console.assert(typeof type === "string", "type should be a string");
        console.assert(
            typeof unendorse === "boolean",
            "unendorse should be a boolean",
        );
        console.assert(typeof pid === "number", "pid should be a number");
        console.assert(typeof uid === "number", "uid should be a number");
        console.assert(
            typeof endorseStatus === "object",
            "endorseStatus should be an object",
        );

        uid = parseInt(uid, 10);
        if (uid <= 0) {
            throw new Error("[[error:not-logged-in]]");
        }
        const now = Date.now();

        if (type === "endorse" && !unendorse) {
            await db.sortedSetAdd(`uid:${uid}:endorse`, now, pid);
        } else {
            await db.sortedSetRemove(`uid:${uid}:endorse`, pid);
        }

        const postData = await Posts.getPostFields(pid, ["pid", "uid", "tid"]);
        const newReputation = await user.incrementUserReputationBy(
            postData.uid,
            type === "endorse" ? 1 : 0,
        );

        postData.endorse++;

        const returnObject = {
            user: {
                reputation: newReputation,
            },
            fromuid: uid,
            post: postData,
            endorse: type === "endorse" && !unendorse,
        };

        console.assert(
            typeof returnObject === "object",
            "Return value should be an object",
        );

        return returnObject;
    }

    /**
     * Check if a user has endorsed a post.
     *
     * @param {number} pid - The ID of the post to check for endorsement.
     * @param {number} uid - The user ID to check for endorsement.
     * @returns {Promise<{ endorsed: boolean }>} An object indicating whether the user has endorsed the post.
     */
    Posts.hasEndorsed = async function (pid, uid) {
        console.assert(typeof pid === "number", "pid should be a number");
        console.assert(typeof uid === "number", "uid should be a number");
        if (parseInt(uid, 10) <= 0) {
            return { endorsed: false };
        }
        const hasEndorsed = await db.isMemberOfSets(
            [`pid:${pid}:endorse`],
            uid,
        );

        const returnObject = {
            endorsed: hasEndorsed[0],
        };

        console.assert(
            typeof returnObject === "object",
            "Return value should be an object",
        );
        return returnObject;
    };
};
