**Feature 1: Anonymous Posts**

**Overview** 

At the page of creating a new topic, there should be a place to create tags. Upon creating a tag called “anonymous” and submitting the form, the post should appear in the forum, but the user name should be shown as “Anonymous User.” When users click into the post, they will be able to see the title and the content, but not the user name. This feature allows anonymity for users to share their thoughts on the forum.

**Link to tests** 

The tests are in the test file named test/topics.js (lines 125-133).

**How to test** 

These tests run through the following steps and ensure each of the steps return the expected results:
1. The test function makes a POST request to create a new topic that contains ‘anonymous’ as one of its tags
2. The function checks that the request has no errors
3. The function checks that the request returns a valid results Object that contains topicData
4. The function checks to ensure that ‘isAnonymous’ is an existing property for the topic

**User test**
1. Create a new topic and add a tag called “anonymous.” Their isAnonymous property should be set to true.
2. Posts that have the property “isAnonymous” as false should show up in the forum as normal, with all pieces of information present.
3. Posts that have the property “isAnonymous” as true should show up in the forum with the user name shown as “Anonymous User.” Users must not be able to see the user name anywhere.

**What is being tested** 
1. Test Function: The test function makes a POST request to create a new topic with the "anonymous" tag.
2. Error Handling: It checks that the request has no errors, ensuring the request is successful.
3. Valid Results: It verifies that the request returns a valid results object containing topicData.
4. isAnonymous Property: It checks that the "isAnonymous" property is an existing property for the topic.

**Why these tests are sufficient**

The tests cover the entire process of creating anonymous posts, from the initial request to the display of the posts on the forum. They ensure that the "isAnonymous" property is properly set and that the user's identity remains hidden when it should be. The tests also cover error handling, so it's a comprehensive testing approach for this feature.

**Feature 2: Endorsement**

**Overview:**

Each post will have a button named “endorse”, where each user can click and add 1 to the total number of endorsements. The total number will be reflected on the post interface.

**Link to tests:**

The tests are in the test file named test/post.js (lines 315-323). 

**How to test:**
1. These tests run through the following steps and ensure each of the steps return the expected results:
2. Every post in each topic should contain an “endorse” button
3. The posts.toggleSetEndorsed function should toggle the post’s isEndorsed variable
4. Then, calling posts.getEndorsed will return the correct isEndorsed value

**User Tests**
1. Every post in each topic should contain an “endorse” button
2. This button is clickable and should show the post as endorsed upon clicking. The counter number should immediately add 1. Other parts of the UI must not be changed.

**What is being tested**
1. The presence and functionality of the "endorse" button in all posts.
2. The core functionality of toggling the isEndorsed property when the button is clicked.
3. The accuracy of the endorsement count as reflected in the user interface.
4. The usability and behavior of the "endorse" button for users.
5. Ensuring that endorsing a post does not lead to unintended changes in other parts of the user interface, maintaining overall application stability.

**Why these tests are Sufficient**
The tests comprehensively cover the critical aspects of the feature, including the presence and functionality of the "endorse" button, the core functionality of toggling the isEndorsed property, the accuracy of the endorsement count, and potential side effects on the user interface. The tests ensure the feature functions as expected from the user's perspective. Additionally, the tests are structured and focused, aiding in error detection and maintaining overall application stability. This comprehensive approach provides confidence in the proper functioning of the "Endorsement" feature.


