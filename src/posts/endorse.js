'use strict';

const meta = require('../meta');
const db = require('../database');
const flags = require('../flags');
const user = require('../user');
const topics = require('../topics');
const plugins = require('../plugins');
const privileges = require('../privileges');
const translator = require('../translator');

module.exports = function (Posts) {

    Posts.endorse = async function (pid, uid) {
        const canEndorse = await privileges.posts.can('posts:endorse', pid, uid);
        if (!canEndorse) {
            throw new Error('[[error:no-privileges]]');
        }
        return await toggleEndorse('endorse', pid, uid);
    };

    async function toggleEndorse(type, pid, uid) {
        const endorseStatus = await Posts.hasEndorsed(pid, uid);
        await unendorse(pid, uid, type, endorseStatus);
        return await endorse(type, false, pid, uid, endorseStatus);
    }

    async function unendorse(pid, uid, type, endorseStatus) {
        if (!endorseStatus || (!endorseStatus.endorsed)) {
            return;
        }

        return await endorse('endorse', true, pid, uid, endorseStatus);
    }

    async function endorse(type, unendorse, pid, uid, endorseStatus) {
        uid = parseInt(uid, 10);
        if (uid <= 0) {
            throw new Error('[[error:not-logged-in]]');
        }
        const now = Date.now();

        if (type === 'endorse' && !unendorse) {
            await db.sortedSetAdd(`uid:${uid}:endorse`, now, pid);
        } else {
            await db.sortedSetRemove(`uid:${uid}:endorse`, pid);
        }

        const postData = await Posts.getPostFields(pid, ['pid', 'uid', 'tid']);
        const newReputation = await user.incrementUserReputationBy(postData.uid, type === 'endorse' ? 1 : 0);

        postData.endorse ++;

        return {
            user: {
                reputation: newReputation,
            },
            fromuid: uid,
            post: postData,
            endorse: type === 'endorse' && !unendorse,
        };
    }

    Posts.hasEndorsed = async function (pid, uid) {
        if (parseInt(uid, 10) <= 0) {
            return { endorsed: false};
        }
        const hasEndorsed = await db.isMemberOfSets([`pid:${pid}:endorse`], uid);
        return { endorsed: hasEndorsed[0]};
    };


};
