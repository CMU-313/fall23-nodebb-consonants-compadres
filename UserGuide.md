**Feature 1: Anonymous Posts**

**Overview:**
At the page of creating a new topic, there should be a place to create tags. Upon creating a tag called “anonymous” and submitting the form, the post should appear in the forum, but the user name should be shown as “Anonymous User.” When users click into the post, they will be able to see the title and the content, but not the user name. This feature allows anonymity for users to share their thoughts on the forum.

**How to test:**
The tests are in the test file named test/topics.js (lines 125-133). These tests run through the following steps and ensure each of the steps return the expected results:\n
1. The test function makes a POST request to create a new topic that contains ‘anonymous’ as one of its tags\n
2. The function checks that the request has no errors\n
3. The function checks that the request returns a valid results Object that contains topicData\n
4. The function checks to ensure that ‘isAnonymous’ is an existing property for the topic\n

**User test**
1. Create a new topic and add a tag called “anonymous.” Their isAnonymous property should be set to true.\n
2. Posts that have the property “isAnonymous” as false should show up in the forum as normal, with all pieces of information present.\n
3. Posts that have the property “isAnonymous” as true should show up in the forum with the user name shown as “Anonymous User.” Users must not be able to see the user name anywhere.



**Feature 2: Endorsement**

**Overview:**
Each post will have a button named “endorse”, where each user can click and add 1 to the total number of endorsements. The total number will be reflected on the post interface.

**How to test:**
1. The tests are in the test file named test/post.js (lines 315-323). These tests run through the following steps and ensure each of the steps return the expected results:\n
2. Every post in each topic should contain an “endorse” button\n
3. The posts.toggleSetEndorsed function should toggle the post’s isEndorsed variable\n
4. Then, calling posts.getEndorsed will return the correct isEndorsed value

**User Tests**
1. Every post in each topic should contain an “endorse” button\n
2. This button is clickable and should show the post as endorsed upon clicking. The counter number should immediately add 1. Other parts of the UI must not be changed.
