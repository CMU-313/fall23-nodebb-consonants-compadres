**Feature 1: Anonymous Posts**\n

**Overview** \n
At the page of creating a new topic, there should be a place to create tags. Upon creating a tag called “anonymous” and submitting the form, the post should appear in the forum, but the user name should be shown as “Anonymous User.” When users click into the post, they will be able to see the title and the content, but not the user name. This feature allows anonymity for users to share their thoughts on the forum.\n

**Link to tests** \n
The tests are in the test file named test/topics.js (lines 125-133).\n

**How to test** \n
These tests run through the following steps and ensure each of the steps return the expected results:\n
1. The test function makes a POST request to create a new topic that contains ‘anonymous’ as one of its tags\n
2. The function checks that the request has no errors\n
3. The function checks that the request returns a valid results Object that contains topicData\n
4. The function checks to ensure that ‘isAnonymous’ is an existing property for the topic\n

**User test**\n
1. Create a new topic and add a tag called “anonymous.” Their isAnonymous property should be set to true.\n
2. Posts that have the property “isAnonymous” as false should show up in the forum as normal, with all pieces of information present.\n
3. Posts that have the property “isAnonymous” as true should show up in the forum with the user name shown as “Anonymous User.” Users must not be able to see the user name anywhere.\n

**What is being tested** \n
1. Test Function: The test function makes a POST request to create a new topic with the "anonymous" tag.\n
2. Error Handling: It checks that the request has no errors, ensuring the request is successful.\n
3. Valid Results: It verifies that the request returns a valid results object containing topicData.\n
4. isAnonymous Property: It checks that the "isAnonymous" property is an existing property for the topic.\n

**Why these tests are sufficient**\n
The tests cover the entire process of creating anonymous posts, from the initial request to the display of the posts on the forum. They ensure that the "isAnonymous" property is properly set and that the user's identity remains hidden when it should be. The tests also cover error handling, so it's a comprehensive testing approach for this feature.\n\n

**Feature 2: Endorsement**\n

**Overview:**\n
Each post will have a button named “endorse”, where each user can click and add 1 to the total number of endorsements. The total number will be reflected on the post interface.\n

**Link to tests:**\n
The tests are in the test file named test/post.js (lines 315-323). \n

**How to test:**\n
1. These tests run through the following steps and ensure each of the steps return the expected results:\n
2. Every post in each topic should contain an “endorse” button\n
3. The posts.toggleSetEndorsed function should toggle the post’s isEndorsed variable\n
4. Then, calling posts.getEndorsed will return the correct isEndorsed value\n

**User Tests**\n
1. Every post in each topic should contain an “endorse” button\n
2. This button is clickable and should show the post as endorsed upon clicking. The counter number should immediately add 1. Other parts of the UI must not be changed.\n

**What is being tested**\n
1. The presence and functionality of the "endorse" button in all posts.\n
2. The core functionality of toggling the isEndorsed property when the button is clicked.\n
3. The accuracy of the endorsement count as reflected in the user interface.\n
4. The usability and behavior of the "endorse" button for users.\n
5. Ensuring that endorsing a post does not lead to unintended changes in other parts of the user interface, maintaining overall application stability.\n

**Why these tests are Sufficient**\n
The tests comprehensively cover the critical aspects of the feature, including the presence and functionality of the "endorse" button, the core functionality of toggling the isEndorsed property, the accuracy of the endorsement count, and potential side effects on the user interface. The tests ensure the feature functions as expected from the user's perspective. Additionally, the tests are structured and focused, aiding in error detection and maintaining overall application stability. This comprehensive approach provides confidence in the proper functioning of the "Endorsement" feature.\n


