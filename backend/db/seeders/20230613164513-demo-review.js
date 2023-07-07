'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    await queryInterface.bulkInsert(options,[
      {
        spotId: 1,
        userId: 3,
        review: "A true paradise by the beach! The cottage was charming and the ocean views were absolutely stunning. It was the perfect getaway for relaxation. Highly recommended!",
        stars: 5
      },
      {
        spotId: 1,
        userId: 2,
        review: "We had a magical time at Serenity Cove. The location was unbeatable, and the cottage had all the amenities we needed. The sound of the crashing waves was incredibly soothing. 4/5 stars.",
        stars: 4
      },
      {
        spotId: 1,
        userId: 1,
        review:  "Serenity Cove offered a serene and peaceful escape. The cottage was comfortable, although it could benefit from some modern updates. Nonetheless, the view made up for it! 4/5 stars.",
        stars: 4
      },
      {
        spotId: 2,
        userId: 3,
        review:  "What a magical experience! The log cabin nestled in the enchanting forest was a dream come true. The trails around the area were breathtaking. Highly recommended for nature enthusiasts.",
        stars: 5
      },
      {
        spotId: 2,
        userId: 2,
        review:  "Enchanted Forest Retreat was a perfect hideaway from the bustling city. The cabin had a cozy charm, and the surrounding nature was stunning. We thoroughly enjoyed our stay.",
        stars: 4
      },
      {
        spotId: 2,
        userId: 1,
        review: "The location was fantastic, surrounded by beautiful trees and wildlife. The cabin itself was comfortable, but it could use some updates. Overall, it was a peaceful retreat.",
        stars: 3
      },
      {
        spotId: 3,
        userId: 3,
        review: "Sunset Paradise lived up to its name! The villa perched on the cliffside offered breathtaking views of the Santorini sunset. The accommodations were luxurious, and the service was impeccable.",
        stars: 5
      },
      {
        spotId: 3,
        userId: 2,
        review: "We had an unforgettable stay at Sunset Paradise. The villa was beautifully designed, and the sunset views were simply breathtaking. It was a romantic and luxurious experience.",
        stars: 5
      },
      {
        spotId: 3,
        userId: 1,
        review: "The villa was stunning, and the sunsets were mesmerizing. However, the price was quite high, and we expected a bit more in terms of amenities. Nonetheless, it was a memorable stay.",
        stars: 4
      },
      {
        spotId: 4,
        userId: 1,
        review: "Paradise found! Staying in an overwater bungalow at Azure Waters was a dream come true. The crystal-clear lagoons were breathtaking, and the accommodations were luxurious. The perfect place to relax and unwind.",
        stars: 5
      },
      {
        spotId: 4,
        userId: 2,
        review: "Azure Waters exceeded our expectations. The overwater bungalow provided a unique and unforgettable experience. Waking up to the stunning views of the turquoise lagoons was truly magical. We would go back in a heartbeat.",
        stars: 4
      },
      {
        spotId: 4,
        userId: 3,
        review: "While the setting of Azure Waters was undeniably beautiful, we found the price to be quite steep for what was offered. The overwater bungalow was comfortable, but it lacked some essential amenities. Nonetheless, the scenery made up for it.",
        stars: 3
      },
      {
        spotId: 5,
        userId: 1,
        review: "A nature lover's paradise! Mountain Haven was the perfect retreat in the heart of the Canadian Rockies. The cabin was cozy, and the mountain views were awe-inspiring. We enjoyed hiking and exploring the surrounding trails. Highly recommended!",
        stars: 5
      },
      {
        spotId: 5,
        userId: 2,
        review: "Mountain Haven provided a peaceful and serene escape. The cabin had a rustic charm, and the panoramic mountain vistas were breathtaking. We loved every moment of our stay and would return in a heartbeat.",
        stars:5
      },
      {
        spotId: 5,
        userId: 3,
        review: "While the scenery at Mountain Haven was undeniably beautiful, we found the cabin to be smaller than anticipated. Additionally, some maintenance issues needed attention. Nevertheless, the surrounding nature made it a worthwhile experience.",
        stars: 3
      },
      {
        spotId: 6,
        userId: 1,
        review: "Paradise found in Tulum! Tropical Oasis was the ultimate getaway. The private jungle villa was luxurious, and the pool provided a refreshing respite from the heat. The nearby beaches were pristine. We can't wait to go back!",
        stars: 5
      },
      {
        spotId: 6,
        userId: 2,
        review: "Tropical Oasis lived up to its name. The villa nestled in the jungle was a tranquil haven. We loved the privacy and the beautiful surroundings. The proximity to the white sandy beaches was a bonus. Highly recommended!",
        stars: 4
      },
      {
        spotId: 6,
        userId: 3,
        review: "While the villa at Tropical Oasis was beautiful, we encountered some issues with maintenance and cleanliness. The jungle setting was idyllic, but there were some inconveniences. However, the overall experience was still enjoyable.",
        stars: 3
      },{
        spotId: 7,
        userId: 1,
        review: "Tranquil Retreat truly lived up to its name. The lakeside cottage provided a serene and picturesque escape. The surrounding mountains created a breathtaking backdrop, and the peaceful atmosphere was perfect for relaxation. Highly recommended!",
        stars: 5
      },{
        spotId: 7,
        userId: 2,
        review: "Our stay at Tranquil Retreat was incredible. The cottage was cozy and well-equipped, and the location by the lake was simply stunning. We enjoyed hiking, kayaking, and soaking in the natural beauty. Can't wait to return!",
        stars: 5
      },{
        spotId: 7,
        userId: 3,
        review: "While the location of Tranquil Retreat was beautiful, we found the cottage to be a bit outdated and in need of some renovations. However, the tranquility of the surroundings made it a worthwhile experience.",
        stars: 4
      },{
        spotId: 8,
        userId: 1,
        review: "Desert Mirage was an oasis in the heart of the desert. The riad was beautifully designed with intricate Moroccan architecture. The courtyard was a peaceful haven, and the warm hospitality of the staff made our stay memorable. Highly recommended!",
        stars: 5
      },{
        spotId: 8,
        userId: 2,
        review: "Staying at Desert Mirage was like stepping into a magical world. The riad's traditional decor and ambiance were enchanting. We loved exploring the bustling souks of Marrakech and returning to the calm oasis of Desert Mirage.",
        stars: 4
      },{
        spotId: 8,
        userId: 3,
        review: "Desert Mirage offered an authentic Moroccan experience. The riad had its charm, but it lacked some modern amenities. The location was convenient for exploring Marrakech, but we expected a bit more in terms of comfort.",
        stars: 3
      },{
        spotId: 9,
        userId: 1,
        review: "Island Hideaway was pure paradise. The private villa suspended over the crystal-clear waters was breathtaking. We spent our days snorkeling, sunbathing, and enjoying the serenity of the Maldives. It was a once-in-a-lifetime experience.",
        stars: 5
      },{
        spotId: 9,
        userId: 2,
        review: "We had an unforgettable time at Island Hideaway. The villa was luxurious, and the views of the turquoise ocean were incredible. The resort staff were attentive and made us feel pampered throughout our stay. Highly recommended!",
        stars: 5
      },{
        spotId: 9,
        userId: 3,
        review: "Island Hideaway offered a stunning location, but we found the price to be quite high for what was provided. The villa was beautiful, but there were some minor issues with maintenance. Nonetheless, the natural beauty of the Maldives made it a memorable trip.",
        stars: 4
      },{
        spotId: 10,
        userId: 1,
        review: "Our stay at Alpine Chalet was an unforgettable alpine experience. The chalet exuded Swiss charm, and the surrounding snow-capped mountains were simply breathtaking. We enjoyed skiing during the day and cozying up by the fireplace at night. Highly recommended!",
        stars: 5
      },{
        spotId: 10,
        userId: 2,
        review: "Alpine Chalet provided the perfect winter getaway. The chalet was cozy and well-equipped, and the mountain views were mesmerizing. We loved exploring the scenic hiking trails in the area. It was a true alpine paradise.",
        stars: 4
      },{
        spotId: 10,
        userId: 3,
        review: "The location of Alpine Chalet was fantastic, but we found the interior of the chalet to be a bit outdated. However, the charm of the Swiss Alps made it a worthwhile stay. The breathtaking views compensated for any minor inconveniences.",
        stars: 4
      },{
        spotId: 11,
        userId: 1,
        review: "Beach Breeze Retreat was a slice of coastal paradise. The beach house was stylishly decorated and just steps away from the pristine turquoise waters. We enjoyed long walks on the sandy beaches and stunning sunsets. Highly recommended!",
        stars: 5
      },{
        spotId: 11,
        userId: 2,
        review: "Our stay at Beach Breeze Retreat was incredible. The location was unbeatable, and the beach house provided a comfortable and relaxing atmosphere. We loved listening to the sound of crashing waves and soaking up the sun. Can't wait to return!",
        stars: 5
      },{
        spotId: 11,
        userId: 3,
        review: "While the location of Beach Breeze Retreat was excellent, we found the beach house to be smaller than anticipated. However, the proximity to the beach and the overall coastal ambiance made it a memorable stay.",
        stars: 4
      },{
        spotId: 12,
        userId: 1,
        review: "Zen Garden Villa was a haven of tranquility. The traditional villa with its beautiful Zen garden provided a serene and peaceful escape. We enjoyed practicing meditation and tea ceremonies. It was a true immersion into Japanese culture. Highly recommended!",
        stars: 5
      },{
        spotId: 12,
        userId: 2,
        review: "Staying at Zen Garden Villa was a unique experience. The villa was elegantly designed, and the Zen garden created a calming ambiance. We loved exploring Kyoto's temples and returning to the serenity of the villa.",
        stars: 4
      },{
        spotId: 12,
        userId: 3,
        review: "While the Zen Garden Villa was peaceful, we encountered some issues with cleanliness and maintenance. Nonetheless, the traditional Japanese atmosphere and the beauty of the Zen garden were highlights of our stay.",
        stars: 3
      },{
        spotId: 13,
        userId: 1,
        review: "Our safari experience at Safari Lodge was unforgettable. The lodge itself was luxurious, and the surrounding Maasai Mara landscape was teeming with wildlife. We went on exhilarating game drives and witnessed incredible animal sightings. Highly recommended for nature enthusiasts!",
        stars: 5
      },{
        spotId: 13,
        userId: 2,
        review: "Safari Lodge provided an authentic and immersive safari adventure. The lodge was comfortable, and the staff were knowledgeable and friendly. We enjoyed every moment of our game drives and were mesmerized by the beauty of the Maasai Mara.",
        stars: 5
      },{
        spotId: 13,
        userId: 3,
        review: "While the safari experience at Safari Lodge was incredible, we found the price to be quite high. Additionally, some aspects of the lodge could use improvement. Nonetheless, the opportunity to witness the wildlife up close made it a worthwhile trip.",
        stars: 4
      },{
        spotId: 14,
        userId: 1,
        review: "Snowy Peaks Cabin was a winter wonderland retreat. The cozy cabin nestled in the snowy peaks of Aspen provided a perfect setting for our ski vacation. We enjoyed hitting the slopes during the day and coming back to the warmth of the cabin in the evenings. Highly recommended for winter enthusiasts!",
        stars: 5
      },{
        spotId: 14,
        userId: 2,
        review: "We had a fantastic time at Snowy Peaks Cabin. The cabin was charming, and the snowy mountain views were breathtaking. We enjoyed skiing, snowboarding, and exploring the scenic trails nearby. It was a true alpine escape.",
        stars: 4
      },{
        spotId: 14,
        userId: 3,
        review: "While the location of Snowy Peaks Cabin was idyllic, we found the cabin to be smaller than expected. However, the beauty of the surroundings made up for it. It was a cozy and enjoyable stay in the midst of nature.",
        stars: 4
      },{
        spotId: 15,
        userId: 1,
        review: "Paradise Beachfront Villa truly lived up to its name. The villa was luxurious, and the private pool provided a refreshing oasis. The views of the pristine beach and the Andaman Sea were simply breathtaking. Highly recommended for a luxurious beach getaway!",
        stars: 5
      },{
        spotId: 15,
        userId: 2,
        review: "Our stay at Paradise Beachfront Villa was like a dream come true. The villa was elegantly designed, and the beachfront location was unparalleled. We spent our days lounging by the pool and strolling along the white sandy beaches. It was pure paradise.",
        stars: 5
      },{
        spotId: 15,
        userId: 3,
        review: "While Paradise Beachfront Villa was beautiful, we found the price to be quite high for what was offered. However, the stunning beach views and the serene ambiance made it a memorable stay.",
        stars: 4
      },{
        spotId: 16,
        userId: 1,
        review: "Staying at Treehouse Haven was a truly unique experience. The treehouse nestled in the Amazon Rainforest was a magical retreat. Waking up to the sounds of nature and being surrounded by lush greenery was unforgettable. Highly recommended for adventurous souls!",
        stars: 5
      },{
        spotId: 16,
        userId: 2,
        review: "Treehouse Haven was a hidden gem in the heart of the rainforest. The treehouse was well-designed, and the proximity to nature was incredible. We enjoyed exploring the rainforest trails and immersing ourselves in the natural beauty.",
        stars: 4
      },{
        spotId: 16,
        userId: 3,
        review: "While Treehouse Haven offered a unique experience, we found the accommodations to be more rustic than expected. However, the setting in the Amazon Rainforest was breathtaking. It was a one-of-a-kind adventure.",
        stars: 3
      },{
        spotId: 17,
        userId: 1,
        review: "Our stay at Coastal Castle was like living in a fairytale. The castle perched on the Irish coastline was stunning, and the rugged views of the sea were mesmerizing. We felt like royalty during our stay. Highly recommended for a luxurious and picturesque getaway!",
        stars: 5
      },{
        spotId: 17,
        userId: 2,
        review: "Coastal Castle was a dream come true. The castle's grandeur and the sweeping ocean views were awe-inspiring. We enjoyed exploring the surrounding coastal areas and returning to the comforts of the castle. It was a magical experience.",
        stars: 5
      },{
        spotId: 17,
        userId: 3,
        review: "Coastal Castle was undeniably beautiful, but we found the price to be quite high. Additionally, some aspects of the castle needed maintenance. Nonetheless, the coastal location made it a memorable stay.",
        stars: 4
      },{
        spotId: 18,
        userId: 1,
        review: "Lakeside Retreat was a peaceful and idyllic escape. The cottage nestled by the lake offered beautiful views and a serene atmosphere. We enjoyed canoeing, fishing, and simply basking in the natural beauty. Highly recommended for nature lovers!",
        stars: 5
      },{
        spotId: 18,
        userId: 2,
        review: "Our stay at Lakeside Retreat was exactly what we needed. The cottage was cozy, and the surrounding mountains and lake created a picturesque setting. We spent our days hiking, swimming, and enjoying the tranquility. It was a rejuvenating experience.",
        stars: 4
      },{
        spotId: 18,
        userId: 3,
        review: "Lakeside Retreat was a charming getaway, but we encountered some minor issues with the amenities. However, the beauty of the lakeside location and the peaceful ambiance made it a worthwhile stay.",
        stars: 4
      },{
        spotId: 19,
        userId: 1,
        review: "Hidden Gem Cottage truly lived up to its name. Tucked away in the picturesque countryside, this charming cottage provided a peaceful and cozy retreat. The surrounding scenery was breathtaking, and we enjoyed exploring the nearby trails. Highly recommended for a tranquil getaway!",
        stars: 5
      },{
        spotId: 19,
        userId: 2,
        review: "We had a delightful stay at Hidden Gem Cottage. The cottage was quaint and full of character, and the location was serene and idyllic. It was the perfect place to unwind and disconnect from the hustle and bustle of daily life.",
        stars: 4
      },{
        spotId: 19,
        userId: 3,
        review: "While Hidden Gem Cottage offered a beautiful countryside setting, we found the amenities to be a bit basic. However, the peacefulness of the location and the natural beauty of the surroundings made it a worthwhile stay.",
        stars: 3
      },{
        spotId: 20,
        userId: 1,
        review: "Urban Oasis Loft was a hidden gem in the heart of Tokyo. The loft apartment was stylish, and the rooftop garden provided a serene escape from the bustling city. We loved the modern amenities and the convenience of being close to Tokyo's attractions. Highly recommended for a city retreat!",
        stars: 5
      },{
        spotId: 20,
        userId: 2,
        review: "Our stay at Urban Oasis Loft was fantastic. The loft apartment was well-designed and comfortable, and the rooftop garden was a peaceful oasis in the middle of Tokyo. It was the perfect balance between urban convenience and relaxation.",
        stars: 4
      },{
        spotId: 20,
        userId: 3,
        review: "Urban Oasis Loft offered a convenient location, but we found the apartment to be smaller than expected. However, the rooftop garden provided a nice respite, and the modern amenities made our stay enjoyable.",
        stars: 4
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews'
    await queryInterface.bulkDelete(options)
  }
};
