const { Blogpost } = require('../models');

const postData = 
[
   {
      "title": "Seeded Blog Posts Explained",
      "post_body": "First post is here. The following posts will be Lorem Ipsum. This is defined in the seeds folder, JSON files",    
      "user_id": 1          
   },
   {
      "title": "My Intro into Full Stack Web Development",
      "post_body": "My second ever blogpost. As I continue to develop this blog, I am increasingly more willing to refer to myself as a fullstack developer. The days of creating html, adjusting and readjusting css are gone.",    
      "user_id": 1          
   },
   {
      "title": "Tommorow and the Next",
      "post_body": "The development process has shifted into a focus on understanding, implementing and constantly practicing new forms of organization methods when developing.",    
      "user_id": 1          
   },
   {
      "title": "Dapibus Amet Ridiculus",
      "post_body": "Vestibulum id ligula porta felis euismod semper. Cras justo odio, dapibus ac facilisis in, egestas eget quam.",    
      "user_id": 2          
   },
   {
      "title": "Vestibulum id ligula porta felis euismod semper.",
      "post_body": "Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Maecenas sed diam eget risus varius blandit sit amet non magna.",    
      "user_id": 3    
   },
   {
      "title": "Sit Fermentum",
      "post_body": "Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Nullam quis risus eget urna mollis ornare vel eu leo. Lorem ipsum dolor sit amet,consectetur adipiscing elit.",
      "user_id": 4       
   }
];

const seedPosts = () => Blogpost.bulkCreate(postData);

module.exports = seedPosts;