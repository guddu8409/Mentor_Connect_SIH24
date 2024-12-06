const mongoose = require("mongoose");
const Success = require("../models/success");
const User = require("../models/user");
const logger = require("../utils/logger")("successSeeder"); // Import your logger
const { successValidate } = require("../schemas/successSchema");
const successData = [
  // Existing data
  {
    title: "Achieved Promotion at Work",
    description:
      "After years of hard work and dedication, I was promoted to a senior role at my company.",
    image: {
      url: "https://images.pexels.com/photos/3184305/pexels-photo-3184305.jpeg",
      filename: "promotion_work.jpg",
    },
  },
  {
    title: "Completed Marathon in Mumbai",
    description: "Ran the Mumbai Marathon and achieved a personal best time.",
    image: {
      url: "https://images.pexels.com/photos/2724747/pexels-photo-2724747.jpeg",
      filename: "mumbai_marathon.jpg",
    },
  },
  {
    title: "Launched a Startup in Bangalore",
    description:
      "Founded a tech startup in Bangalore focusing on AI solutions, and received initial funding within the first month.",
    image: {
      url: "https://images.pexels.com/photos/3183182/pexels-photo-3183182.jpeg",
      filename: "startup_bangalore.jpg",
    },
  },
  {
    title: "Graduated from IIT Delhi",
    description:
      "Graduated with top honors from the Indian Institute of Technology Delhi, with a specialization in Computer Science.",
    image: {
      url: "https://images.pexels.com/photos/167949/pexels-photo-167949.jpeg",
      filename: "iit_delhi_graduation.jpg",
    },
  },
  {
    title: "Published a Book on Indian Cuisine",
    description:
      "Authored and published a book on traditional Indian cuisine, featuring recipes from various regions.",
    image: {
      url: "https://images.pexels.com/photos/3795857/pexels-photo-3795857.jpeg",
      filename: "indian_cuisine_book.jpg",
    },
  },
  // Additional data
  {
    title: "Opened a Boutique in Delhi",
    description:
      "Launched a fashion boutique in Delhi, showcasing contemporary Indian designs and gaining a loyal customer base.",
    image: {
      url: "https://images.pexels.com/photos/4051141/pexels-photo-4051141.jpeg",
      filename: "delhi_boutique.jpg",
    },
  },
  {
    title: "Won National Award for Innovation",
    description:
      "Received a prestigious national award for innovation in sustainable technology.",
    image: {
      url: "https://images.pexels.com/photos/3975600/pexels-photo-3975600.jpeg",
      filename: "national_award_innovation.jpg",
    },
  },
  {
    title: "Successfully Hosted a Tech Conference",
    description:
      "Organized a successful tech conference in Hyderabad, featuring top industry experts and startups.",
    image: {
      url: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg",
      filename: "tech_conference_hyderabad.jpg",
    },
  },
  {
    title: "Completed Yoga Teacher Training",
    description:
      "Completed a rigorous yoga teacher training course and began teaching yoga classes in Pune.",
    image: {
      url: "https://images.pexels.com/photos/3055693/pexels-photo-3055693.jpeg",
      filename: "yoga_teacher_training.jpg",
    },
  },
  {
    title: "Secured Funding for Social Enterprise",
    description:
      "Raised significant funding for a social enterprise focused on improving rural education.",
    image: {
      url: "https://images.pexels.com/photos/3184342/pexels-photo-3184342.jpeg",
      filename: "social_enterprise_funding.jpg",
    },
  },
  {
    title: "Launched a Health & Wellness Blog",
    description:
      "Started a popular blog on health and wellness, sharing tips and personal experiences.",
    image: {
      url: "https://images.pexels.com/photos/4173433/pexels-photo-4173433.jpeg",
      filename: "health_wellness_blog.jpg",
    },
  },
  {
    title: "Traveled the World with a Photography Project",
    description:
      "Completed a world tour documenting cultural diversity through a photography project.",
    image: {
      url: "https://images.pexels.com/photos/3037615/pexels-photo-3037615.jpeg",
      filename: "world_photography_project.jpg",
    },
  },
  {
    title: "Started a Non-Profit for Animal Welfare",
    description:
      "Established a non-profit organization dedicated to animal welfare and rescue operations.",
    image: {
      url: "https://images.pexels.com/photos/5702227/pexels-photo-5702227.jpeg",
      filename: "animal_welfare_nonprofit.jpg",
    },
  },
  {
    title: "Created a Popular Mobile App",
    description:
      "Developed and launched a mobile app that gained widespread popularity and positive reviews.",
    image: {
      url: "https://images.pexels.com/photos/3561075/pexels-photo-3561075.jpeg",
      filename: "mobile_app_success.jpg",
    },
  },
  {
    title: "Opened a Cafe in Chennai",
    description:
      "Launched a cozy cafe in Chennai that quickly became a local favorite for coffee and snacks.",
    image: {
      url: "https://images.pexels.com/photos/2802772/pexels-photo-2802772.jpeg",
      filename: "chennai_cafe.jpg",
    },
  },
  {
    title: "Started a YouTube Channel on Indian Cooking",
    description:
      "Launched a YouTube channel focusing on traditional and modern Indian recipes, growing a large subscriber base.",
    image: {
      url: "https://images.pexels.com/photos/3798857/pexels-photo-3798857.jpeg",
      filename: "indian_cooking_youtube.jpg",
    },
  },
  {
    title: "Opened a Yoga Studio in Bangalore",
    description:
      "Opened a state-of-the-art yoga studio in Bangalore, offering a range of classes and wellness programs.",
    image: {
      url: "https://images.pexels.com/photos/3794147/pexels-photo-3794147.jpeg",
      filename: "yoga_studio_bangalore.jpg",
    },
  },
  {
    title: "Graduated from Indian School of Business",
    description:
      "Earned an MBA from the Indian School of Business, specializing in finance and entrepreneurship.",
    image: {
      url: "https://images.pexels.com/photos/4505822/pexels-photo-4505822.jpeg",
      filename: "isbs_graduation.jpg",
    },
  },
  {
    title: "Achieved Top Sales Performance",
    description:
      "Recognized as the top sales performer in my company for the year, exceeding targets and driving growth.",
    image: {
      url: "https://images.pexels.com/photos/3184340/pexels-photo-3184340.jpeg",
      filename: "top_sales_performance.jpg",
    },
  },
  {
    title: "Won a National Photography Award",
    description:
      "Awarded a national prize for excellence in photography for a series of portraits.",
    image: {
      url: "https://images.pexels.com/photos/2253068/pexels-photo-2253068.jpeg",
      filename: "national_photography_award.jpg",
    },
  },
  {
    title: "Secured a Major Research Grant",
    description:
      "Received a significant grant to fund research in renewable energy technologies.",
    image: {
      url: "https://images.pexels.com/photos/4261354/pexels-photo-4261354.jpeg",
      filename: "research_grant.jpg",
    },
  },
  {
    title: "Opened a Language School in Pune",
    description:
      "Started a language school in Pune, offering courses in multiple languages and attracting students from all over.",
    image: {
      url: "https://images.pexels.com/photos/2990660/pexels-photo-2990660.jpeg",
      filename: "language_school_pune.jpg",
    },
  },
  {
    title: "Launched an E-commerce Platform for Local Artisans",
    description:
      "Created an e-commerce platform that connects local artisans with customers globally, boosting their sales.",
    image: {
      url: "https://images.pexels.com/photos/3408743/pexels-photo-3408743.jpeg",
      filename: "ecommerce_artisans.jpg",
    },
  },
  {
    title: "Started a Tech Blog with Industry Insights",
    description:
      "Founded a tech blog that provides insights and updates on the latest industry trends and innovations.",
    image: {
      url: "https://images.pexels.com/photos/5082596/pexels-photo-5082596.jpeg",
      filename: "tech_blog.jpg",
    },
  },
  {
    title: "Published a Research Paper on AI",
    description:
      "Authored and published a research paper on artificial intelligence, contributing to the academic community.",
    image: {
      url: "https://images.pexels.com/photos/5507907/pexels-photo-5507907.jpeg",
      filename: "ai_research_paper.jpg",
    },
  },
  {
    title: "Opened a Craft Brewery in Bangalore",
    description:
      "Launched a craft brewery in Bangalore, known for its unique and innovative beer flavors.",
    image: {
      url: "https://images.pexels.com/photos/2183716/pexels-photo-2183716.jpeg",
      filename: "craft_brewery_bangalore.jpg",
    },
  },
  {
    title: "Won the Best Startup Award in India",
    description:
      "Awarded the 'Best Startup' title at a national startup competition for innovative business solutions.",
    image: {
      url: "https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg",
      filename: "best_startup_award.jpg",
    },
  },
  {
    title: "Launched a Digital Marketing Agency",
    description:
      "Started a digital marketing agency that helps brands grow their online presence and reach their target audience.",
    image: {
      url: "https://images.pexels.com/photos/3297802/pexels-photo-3297802.jpeg",
      filename: "digital_marketing_agency.jpg",
    },
  },
  {
    title: "Created a Mobile Game with Over a Million Downloads",
    description:
      "Developed a mobile game that gained over a million downloads and received positive feedback from players.",
    image: {
      url: "https://images.pexels.com/photos/2325434/pexels-photo-2325434.jpeg",
      filename: "mobile_game_success.jpg",
    },
  },
  {
    title: "Opened a Fine Dining Restaurant in Delhi",
    description:
      "Established a fine dining restaurant in Delhi, offering a unique culinary experience and receiving rave reviews.",
    image: {
      url: "https://images.pexels.com/photos/3586108/pexels-photo-3586108.jpeg",
      filename: "fine_dining_delhi.jpg",
    },
  },
  {
    title: "Founded a Non-Profit for Rural Healthcare",
    description:
      "Started a non-profit organization focused on providing healthcare services to rural communities.",
    image: {
      url: "https://images.pexels.com/photos/1391888/pexels-photo-1391888.jpeg",
      filename: "rural_healthcare_nonprofit.jpg",
    },
  },
  {
    title: "Achieved Certification in Data Science",
    description:
      "Earned a certification in data science from a prestigious institution, enhancing my skills and career prospects.",
    image: {
      url: "https://images.pexels.com/photos/3862150/pexels-photo-3862150.jpeg",
      filename: "data_science_certification.jpg",
    },
  },
  {
    title: "Launched a Social Media Influencer Career",
    description:
      "Became a successful social media influencer with a large following, collaborating with major brands.",
    image: {
      url: "https://images.pexels.com/photos/4149060/pexels-photo-4149060.jpeg",
      filename: "social_media_influencer.jpg",
    },
  },
  {
    title: "Opened a Wellness Retreat in Kerala",
    description:
      "Started a wellness retreat in Kerala offering relaxation and rejuvenation programs to guests.",
    image: {
      url: "https://images.pexels.com/photos/2090874/pexels-photo-2090874.jpeg",
      filename: "wellness_retreat_kerala.jpg",
    },
  },
  {
    title: "Developed a Cutting-Edge AI Solution",
    description:
      "Created an advanced AI solution that received industry acclaim for its innovation and effectiveness.",
    image: {
      url: "https://images.pexels.com/photos/5740124/pexels-photo-5740124.jpeg",
      filename: "ai_solution_innovation.jpg",
    },
  },
  {
    title: "Won Best Young Entrepreneur Award",
    description:
      "Recognized as the 'Best Young Entrepreneur' for my impactful business ventures and leadership.",
    image: {
      url: "https://images.pexels.com/photos/5480665/pexels-photo-5480665.jpeg",
      filename: "young_entrepreneur_award.jpg",
    },
  },
  {
    title: "Opened an Art Gallery in Mumbai",
    description:
      "Launched an art gallery in Mumbai showcasing contemporary and traditional Indian art.",
    image: {
      url: "https://images.pexels.com/photos/3074664/pexels-photo-3074664.jpeg",
      filename: "art_gallery_mumbai.jpg",
    },
  },
  {
    title: "Completed an Advanced Cooking Course",
    description:
      "Finished an advanced cooking course and started a culinary consultancy business.",
    image: {
      url: "https://images.pexels.com/photos/3170834/pexels-photo-3170834.jpeg",
      filename: "advanced_cooking_course.jpg",
    },
  },
  {
    title: "Founded an NGO for Environmental Conservation",
    description:
      "Established an NGO dedicated to environmental conservation and sustainability initiatives.",
    image: {
      url: "https://images.pexels.com/photos/3184305/pexels-photo-3184305.jpeg",
      filename: "environmental_conservation_ngo.jpg",
    },
  },
  {
    title: "Secured a Major Contract with a Global Client",
    description:
      "Successfully secured a major contract with an international client, expanding the business's global reach.",
    image: {
      url: "https://images.pexels.com/photos/3184290/pexels-photo-3184290.jpeg",
      filename: "global_contract_success.jpg",
    },
  },
  {
    title: "Published a Best-Selling Novel",
    description:
      "Authored a novel that became a bestseller, receiving critical acclaim and widespread readership.",
    image: {
      url: "https://images.pexels.com/photos/1024250/pexels-photo-1024250.jpeg",
      filename: "bestselling_novel.jpg",
    },
  },
  {
    title: "Opened a Vegan Restaurant in Bangalore",
    description:
      "Launched a vegan restaurant in Bangalore, catering to a growing market of health-conscious customers.",
    image: {
      url: "https://images.pexels.com/photos/1390372/pexels-photo-1390372.jpeg",
      filename: "vegan_restaurant_bangalore.jpg",
    },
  },
  {
    title: "Launched a Personal Finance Blog",
    description:
      "Started a blog focusing on personal finance tips and investment strategies, helping readers manage their finances better.",
    image: {
      url: "https://images.pexels.com/photos/4427577/pexels-photo-4427577.jpeg",
      filename: "personal_finance_blog.jpg",
    },
  },
  {
    title: "Graduated from a Prestigious Design School",
    description:
      "Completed a degree in design from a renowned design school, specializing in visual communication and UX/UI.",
    image: {
      url: "https://images.pexels.com/photos/4214888/pexels-photo-4214888.jpeg",
      filename: "design_school_graduation.jpg",
    },
  },
  {
    title: "Opened a Coding Bootcamp in Pune",
    description:
      "Launched a coding bootcamp in Pune, offering intensive programming courses and job placement support.",
    image: {
      url: "https://images.pexels.com/photos/4672828/pexels-photo-4672828.jpeg",
      filename: "coding_bootcamp_pune.jpg",
    },
  },
  {
    title: "Started a Podcast on Indian Culture",
    description:
      "Created a podcast series discussing various aspects of Indian culture, featuring guest experts and cultural insights.",
    image: {
      url: "https://images.pexels.com/photos/4502672/pexels-photo-4502672.jpeg",
      filename: "indian_culture_podcast.jpg",
    },
  },
  {
    title: "Secured Investment for a Health Tech Startup",
    description:
      "Attracted investment for a health tech startup focused on innovative healthcare solutions.",
    image: {
      url: "https://images.pexels.com/photos/4468353/pexels-photo-4468353.jpeg",
      filename: "health_tech_investment.jpg",
    },
  },
  {
    title: "Opened a Farm-to-Table Restaurant",
    description:
      "Started a restaurant offering farm-to-table dining experiences, promoting local produce and sustainability.",
    image: {
      url: "https://images.pexels.com/photos/3933056/pexels-photo-3933056.jpeg",
      filename: "farm_to_table_restaurant.jpg",
    },
  },
  {
    title: "Launched a Mobile Health App",
    description:
      "Developed a mobile health app designed to help users track their fitness and wellness goals.",
    image: {
      url: "https://images.pexels.com/photos/3862347/pexels-photo-3862347.jpeg",
      filename: "mobile_health_app.jpg",
    },
  },
  {
    title: "Published a Guide to Indian Festivals",
    description:
      "Authored a comprehensive guide detailing various Indian festivals, traditions, and cultural practices.",
    image: {
      url: "https://images.pexels.com/photos/3111317/pexels-photo-3111317.jpeg",
      filename: "indian_festivals_guide.jpg",
    },
  },
  {
    title: "Opened a Boutique Fitness Studio",
    description:
      "Launched a boutique fitness studio offering specialized workout classes and personalized training.",
    image: {
      url: "https://images.pexels.com/photos/3278705/pexels-photo-3278705.jpeg",
      filename: "fitness_studio_boutique.jpg",
    },
  },
  {
    title: "Secured a Major Government Grant",
    description:
      "Received a substantial government grant to support a community development project.",
    image: {
      url: "https://images.pexels.com/photos/3669533/pexels-photo-3669533.jpeg",
      filename: "government_grant_success.jpg",
    },
  },
  {
    title: "Opened a Craft Brewery in Goa",
    description:
      "Started a craft brewery in Goa, offering a variety of unique and locally brewed beers.",
    image: {
      url: "https://images.pexels.com/photos/3184305/pexels-photo-3184305.jpeg",
      filename: "craft_brewery_goa.jpg",
    },
  },
  {
    title: "Created a Virtual Reality Experience",
    description:
      "Developed an immersive virtual reality experience showcasing Indian landmarks and culture.",
    image: {
      url: "https://images.pexels.com/photos/3860714/pexels-photo-3860714.jpeg",
      filename: "virtual_reality_experience.jpg",
    },
  },
  {
    title: "Won a National Photography Award",
    description:
      "Received a national award for exceptional photography work, highlighting various aspects of Indian life.",
    image: {
      url: "https://images.pexels.com/photos/3170583/pexels-photo-3170583.jpeg",
      filename: "national_photography_award.jpg",
    },
  },
  {
    title: "Opened a Green Energy Solutions Firm",
    description:
      "Started a firm specializing in green energy solutions and sustainable technologies.",
    image: {
      url: "https://images.pexels.com/photos/2206440/pexels-photo-2206440.jpeg",
      filename: "green_energy_solutions.jpg",
    },
  },
  {
    title: "Launched an E-commerce Platform for Handicrafts",
    description:
      "Created an e-commerce platform to promote and sell traditional Indian handicrafts and artisanal products.",
    image: {
      url: "https://images.pexels.com/photos/4165808/pexels-photo-4165808.jpeg",
      filename: "handicrafts_ecommerce.jpg",
    },
  },
  {
    title: "Opened a Wellness Center in Rishikesh",
    description:
      "Launched a wellness center in Rishikesh offering yoga retreats, meditation sessions, and holistic healing.",
    image: {
      url: "https://images.pexels.com/photos/3837586/pexels-photo-3837586.jpeg",
      filename: "wellness_center_rishikesh.jpg",
    },
  },
  {
    title: "Developed a Language Learning App",
    description:
      "Created an app to help users learn Indian languages with interactive lessons and practical exercises.",
    image: {
      url: "https://images.pexels.com/photos/4082902/pexels-photo-4082902.jpeg",
      filename: "language_learning_app.jpg",
    },
  },
  {
    title: "Published a Book on Indian Architecture",
    description:
      "Authored a book exploring the rich history and diverse styles of Indian architecture.",
    image: {
      url: "https://images.pexels.com/photos/3747460/pexels-photo-3747460.jpeg",
      filename: "indian_architecture_book.jpg",
    },
  },
  {
    title: "Opened a Gourmet Chocolate Shop",
    description:
      "Launched a gourmet chocolate shop offering artisanal chocolates and confectioneries.",
    image: {
      url: "https://images.pexels.com/photos/3068682/pexels-photo-3068682.jpeg",
      filename: "gourmet_chocolate_shop.jpg",
    },
  },
  {
    title: "Created a Popular Travel Vlog",
    description:
      "Started a travel vlog showcasing beautiful destinations and travel tips across India.",
    image: {
      url: "https://images.pexels.com/photos/2753830/pexels-photo-2753830.jpeg",
      filename: "travel_vlog_success.jpg",
    },
  },
  {
    title: "Opened an Eco-Friendly Resort in Shimla",
    description:
      "Launched an eco-friendly resort in Shimla, focusing on sustainable tourism and environmental conservation.",
    image: {
      url: "https://images.pexels.com/photos/3162173/pexels-photo-3162173.jpeg",
      filename: "eco_resort_shimla.jpg",
    },
  },
  {
    title: "Launched a Fitness App with AI Integration",
    description:
      "Developed a fitness app that uses AI to create personalized workout plans and track progress.",
    image: {
      url: "https://images.pexels.com/photos/2724739/pexels-photo-2724739.jpeg",
      filename: "fitness_app_ai.jpg",
    },
  },
  {
    title: "Opened a Traditional Indian Bakery",
    description:
      "Started a bakery specializing in traditional Indian sweets and snacks.",
    image: {
      url: "https://images.pexels.com/photos/1704124/pexels-photo-1704124.jpeg",
      filename: "traditional_bakery.jpg",
    },
  },
  {
    title: "Secured Funding for an EdTech Startup",
    description:
      "Attracted investment for an EdTech startup focused on innovative educational solutions.",
    image: {
      url: "https://images.pexels.com/photos/3862904/pexels-photo-3862904.jpeg",
      filename: "edtech_startup_funding.jpg",
    },
  },
  {
    title: "Opened a Co-Working Space in Hyderabad",
    description:
      "Launched a co-working space in Hyderabad catering to startups and freelancers.",
    image: {
      url: "https://images.pexels.com/photos/4207303/pexels-photo-4207303.jpeg",
      filename: "coworking_space_hyderabad.jpg",
    },
  },
  {
    title: "Developed an Innovative Payment Solution",
    description:
      "Created a cutting-edge payment solution to streamline financial transactions and enhance security.",
    image: {
      url: "https://images.pexels.com/photos/3103762/pexels-photo-3103762.jpeg",
      filename: "payment_solution_innovation.jpg",
    },
  },
  {
    title: "Opened a Boutique Hotel in Jaipur",
    description:
      "Launched a boutique hotel in Jaipur offering luxurious accommodations and personalized services.",
    image: {
      url: "https://images.pexels.com/photos/3061450/pexels-photo-3061450.jpeg",
      filename: "boutique_hotel_jaipur.jpg",
    },
  },
  {
    title: "Created a Popular Food Blog",
    description:
      "Started a food blog focusing on diverse Indian cuisines and culinary experiences.",
    image: {
      url: "https://images.pexels.com/photos/3931318/pexels-photo-3931318.jpeg",
      filename: "food_blog_success.jpg",
    },
  },
  {
    title: "Opened a Sports Complex in Chennai",
    description:
      "Established a sports complex in Chennai with facilities for various sports and fitness activities.",
    image: {
      url: "https://images.pexels.com/photos/3865570/pexels-photo-3865570.jpeg",
      filename: "sports_complex_chennai.jpg",
    },
  },
  {
    title: "Launched a Local Artisans Marketplace",
    description:
      "Created a marketplace to support local artisans and promote handmade crafts from across India.",
    image: {
      url: "https://images.pexels.com/photos/4326568/pexels-photo-4326568.jpeg",
      filename: "local_artisans_marketplace.jpg",
    },
  },
  {
    title: "Developed a Smart Home System",
    description:
      "Created a smart home system with innovative features for enhanced convenience and security.",
    image: {
      url: "https://images.pexels.com/photos/2831700/pexels-photo-2831700.jpeg",
      filename: "smart_home_system.jpg",
    },
  },
  {
    title: "Opened a Language School in Delhi",
    description:
      "Started a language school in Delhi offering courses in various Indian and international languages.",
    image: {
      url: "https://images.pexels.com/photos/3153196/pexels-photo-3153196.jpeg",
      filename: "language_school_delhi.jpg",
    },
  },
  {
    title: "Launched a Health and Wellness Podcast",
    description:
      "Created a podcast focusing on health and wellness topics, featuring expert guests and practical advice.",
    image: {
      url: "https://images.pexels.com/photos/4394106/pexels-photo-4394106.jpeg",
      filename: "health_wellness_podcast.jpg",
    },
  },
  {
    title: "Opened a Craft Studio in Jaipur",
    description:
      "Started a craft studio in Jaipur offering workshops and showcasing traditional craft techniques.",
    image: {
      url: "https://images.pexels.com/photos/2672020/pexels-photo-2672020.jpeg",
      filename: "craft_studio_jaipur.jpg",
    },
  },
  {
    title: "Developed a Revolutionary Fitness Tracker",
    description:
      "Created a cutting-edge fitness tracker with advanced features and health monitoring capabilities.",
    image: {
      url: "https://images.pexels.com/photos/3075498/pexels-photo-3075498.jpeg",
      filename: "fitness_tracker_revolutionary.jpg",
    },
  },
  {
    title: "Published a Collection of Indian Folktales",
    description:
      "Authored a book featuring a collection of traditional Indian folktales and legends.",
    image: {
      url: "https://images.pexels.com/photos/2720506/pexels-photo-2720506.jpeg",
      filename: "indian_folktales_collection.jpg",
    },
  },
  {
    title: "Opened a Wellness Cafe in Bangalore",
    description:
      "Launched a wellness cafe in Bangalore offering healthy food options and relaxation spaces.",
    image: {
      url: "https://images.pexels.com/photos/3408741/pexels-photo-3408741.jpeg",
      filename: "wellness_cafe_bangalore.jpg",
    },
  },
  {
    title: "Created a Unique Furniture Line",
    description:
      "Developed a distinctive furniture line inspired by Indian design and craftsmanship.",
    image: {
      url: "https://images.pexels.com/photos/4358121/pexels-photo-4358121.jpeg",
      filename: "unique_furniture_line.jpg",
    },
  },
  {
    title: "Launched a Mobile App for Traditional Music",
    description:
      "Created a mobile app dedicated to preserving and promoting traditional Indian music and instruments.",
    image: {
      url: "https://images.pexels.com/photos/4130652/pexels-photo-4130652.jpeg",
      filename: "traditional_music_app.jpg",
    },
  },
  {
    title: "Opened a Modern Art Gallery in Mumbai",
    description:
      "Launched a modern art gallery in Mumbai featuring contemporary Indian artists.",
    image: {
      url: "https://images.pexels.com/photos/4386462/pexels-photo-4386462.jpeg",
      filename: "modern_art_gallery_mumbai.jpg",
    },
  },
  {
    title: "Developed a Smart Agriculture System",
    description:
      "Created an innovative smart agriculture system for efficient farming practices.",
    image: {
      url: "https://images.pexels.com/photos/3517364/pexels-photo-3517364.jpeg",
      filename: "smart_agriculture_system.jpg",
    },
  },
  {
    title: "Opened a High-End Fashion Boutique",
    description:
      "Started a high-end fashion boutique offering luxury clothing and accessories.",
    image: {
      url: "https://images.pexels.com/photos/3197802/pexels-photo-3197802.jpeg",
      filename: "fashion_boutique_luxury.jpg",
    },
  },
  {
    title: "Launched an AI-Based Customer Service Platform",
    description:
      "Developed an AI-based platform to enhance customer service and support.",
    image: {
      url: "https://images.pexels.com/photos/5641094/pexels-photo-5641094.jpeg",
      filename: "ai_customer_service_platform.jpg",
    },
  },
  {
    title: "Opened a Traditional Indian Spice Shop",
    description:
      "Started a spice shop specializing in traditional Indian spices and blends.",
    image: {
      url: "https://images.pexels.com/photos/3037302/pexels-photo-3037302.jpeg",
      filename: "indian_spice_shop.jpg",
    },
  },
  {
    title: "Created a Unique Handcrafted Jewelry Line",
    description:
      "Developed a line of handcrafted jewelry inspired by Indian heritage and design.",
    image: {
      url: "https://images.pexels.com/photos/2832366/pexels-photo-2832366.jpeg",
      filename: "handcrafted_jewelry_line.jpg",
    },
  },
  {
    title: "Launched a Social Impact Initiative",
    description:
      "Started a social impact initiative focused on community development and social change.",
    image: {
      url: "https://images.pexels.com/photos/3831252/pexels-photo-3831252.jpeg",
      filename: "social_impact_initiative.jpg",
    },
  },
  {
    title: "Opened a Luxury Spa in Goa",
    description:
      "Launched a luxury spa in Goa offering premium wellness and relaxation services.",
    image: {
      url: "https://images.pexels.com/photos/4107996/pexels-photo-4107996.jpeg",
      filename: "luxury_spa_goa.jpg",
    },
  },
  {
    title: "Created a Mobile Platform for Local Farmers",
    description:
      "Developed a mobile platform to connect local farmers with markets and resources.",
    image: {
      url: "https://images.pexels.com/photos/3722335/pexels-photo-3722335.jpeg",
      filename: "local_farmers_platform.jpg",
    },
  },
  {
    title: "Opened a Design Studio for Indian Textiles",
    description:
      "Started a design studio specializing in traditional Indian textiles and fashion design.",
    image: {
      url: "https://images.pexels.com/photos/2556074/pexels-photo-2556074.jpeg",
      filename: "textile_design_studio.jpg",
    },
  },
  {
    title: "Launched a Personalized Nutrition App",
    description:
      "Developed an app offering personalized nutrition plans and dietary advice based on user preferences.",
    image: {
      url: "https://images.pexels.com/photos/4393592/pexels-photo-4393592.jpeg",
      filename: "nutrition_app_personalized.jpg",
    },
  },
  {
    title: "Opened a Boutique Fitness Studio",
    description:
      "Started a boutique fitness studio offering specialized workout classes and personal training.",
    image: {
      url: "https://images.pexels.com/photos/2585687/pexels-photo-2585687.jpeg",
      filename: "fitness_studio_boutique.jpg",
    },
  },
  {
    title: "Developed a Cutting-Edge Virtual Event Platform",
    description:
      "Created a virtual event platform with advanced features for online conferences and workshops.",
    image: {
      url: "https://images.pexels.com/photos/3753845/pexels-photo-3753845.jpeg",
      filename: "virtual_event_platform.jpg",
    },
  },
  {
    title: "Opened a Craft Beer Bar in Pune",
    description:
      "Launched a craft beer bar in Pune featuring a selection of local and international beers.",
    image: {
      url: "https://images.pexels.com/photos/3068724/pexels-photo-3068724.jpeg",
      filename: "craft_beer_bar_pune.jpg",
    },
  },
  {
    title: "Created a High-Tech Smart Watch",
    description:
      "Developed a high-tech smart watch with advanced health tracking and connectivity features.",
    image: {
      url: "https://images.pexels.com/photos/2379008/pexels-photo-2379008.jpeg",
      filename: "high_tech_smart_watch.jpg",
    },
  },
  {
    title: "Launched a Subscription Box for Indian Snacks",
    description:
      "Started a subscription box service offering a curated selection of Indian snacks and treats.",
    image: {
      url: "https://images.pexels.com/photos/2194541/pexels-photo-2194541.jpeg",
      filename: "snack_subscription_box.jpg",
    },
  },
  {
    title: "Opened an Artisanal Cheese Shop",
    description:
      "Launched a shop specializing in artisanal cheeses and gourmet dairy products.",
    image: {
      url: "https://images.pexels.com/photos/4551463/pexels-photo-4551463.jpeg",
      filename: "artisanal_cheese_shop.jpg",
    },
  },
  {
    title: "Created a Smart Wearable for Health Monitoring",
    description:
      "Developed a smart wearable device for continuous health monitoring and data analysis.",
    image: {
      url: "https://images.pexels.com/photos/3183167/pexels-photo-3183167.jpeg",
      filename: "wearable_health_monitoring.jpg",
    },
  },
  {
    title: "Opened a Tech Innovation Hub in Bangalore",
    description:
      "Launched a tech innovation hub in Bangalore to support startups and technology enthusiasts.",
    image: {
      url: "https://images.pexels.com/photos/2676142/pexels-photo-2676142.jpeg",
      filename: "tech_innovation_hub_bangalore.jpg",
    },
  },
  {
    title: "Developed an Innovative Online Learning Platform",
    description:
      "Created an online learning platform with interactive courses and virtual classrooms.",
    image: {
      url: "https://images.pexels.com/photos/3722560/pexels-photo-3722560.jpeg",
      filename: "online_learning_platform.jpg",
    },
  },
  {
    title: "Launched a Boutique Tea Brand",
    description:
      "Started a boutique tea brand offering a range of premium and exotic tea blends.",
    image: {
      url: "https://images.pexels.com/photos/4067586/pexels-photo-4067586.jpeg",
      filename: "boutique_tea_brand.jpg",
    },
  },
  {
    title: "Opened a Yoga Studio in Mumbai",
    description:
      "Launched a yoga studio in Mumbai offering various yoga classes and wellness programs.",
    image: {
      url: "https://images.pexels.com/photos/4361335/pexels-photo-4361335.jpeg",
      filename: "yoga_studio_mumbai.jpg",
    },
  },
  {
    title: "Developed a Revolutionary Home Automation System",
    description:
      "Created a home automation system with advanced features for smart living.",
    image: {
      url: "https://images.pexels.com/photos/3713160/pexels-photo-3713160.jpeg",
      filename: "home_automation_system.jpg",
    },
  },
  {
    title: "Opened a Contemporary Art Studio",
    description:
      "Started a contemporary art studio focusing on modern art exhibitions and workshops.",
    image: {
      url: "https://images.pexels.com/photos/3054187/pexels-photo-3054187.jpeg",
      filename: "contemporary_art_studio.jpg",
    },
  },
  {
    title: "Launched a Mobile Health Diagnostics App",
    description:
      "Developed a mobile app for on-the-go health diagnostics and consultation.",
    image: {
      url: "https://images.pexels.com/photos/3825880/pexels-photo-3825880.jpeg",
      filename: "mobile_health_diagnostics_app.jpg",
    },
  },
  {
    title: "Opened a Specialty Coffee Shop",
    description:
      "Launched a specialty coffee shop offering artisanal coffee and unique brewing techniques.",
    image: {
      url: "https://images.pexels.com/photos/4105752/pexels-photo-4105752.jpeg",
      filename: "specialty_coffee_shop.jpg",
    },
  },
  {
    title: "Created a Unique Eco-Friendly Packaging Solution",
    description:
      "Developed an eco-friendly packaging solution to reduce environmental impact.",
    image: {
      url: "https://images.pexels.com/photos/6072342/pexels-photo-6072342.jpeg",
      filename: "eco_friendly_packaging_solution.jpg",
    },
  },
  {
    title: "Opened a Creative Writing Workshop",
    description:
      "Started a workshop focused on creative writing and storytelling skills.",
    image: {
      url: "https://images.pexels.com/photos/4670914/pexels-photo-4670914.jpeg",
      filename: "creative_writing_workshop.jpg",
    },
  },
  {
    title: "Launched a Modern Furniture Store",
    description:
      "Opened a store specializing in modern furniture designs and home decor.",
    image: {
      url: "https://images.pexels.com/photos/3063048/pexels-photo-3063048.jpeg",
      filename: "modern_furniture_store.jpg",
    },
  },
  {
    title: "Developed a Cutting-Edge Fitness Tracker",
    description:
      "Created a fitness tracker with advanced health monitoring and activity tracking features.",
    image: {
      url: "https://images.pexels.com/photos/4166280/pexels-photo-4166280.jpeg",
      filename: "fitness_tracker.jpg",
    },
  },
  {
    title: "Opened a Boutique Travel Agency",
    description:
      "Launched a boutique travel agency specializing in personalized travel experiences.",
    image: {
      url: "https://images.pexels.com/photos/2269879/pexels-photo-2269879.jpeg",
      filename: "boutique_travel_agency.jpg",
    },
  },
  {
    title: "Created a Mobile App for Sustainable Living",
    description:
      "Developed an app promoting sustainable living practices and eco-friendly habits.",
    image: {
      url: "https://images.pexels.com/photos/2891779/pexels-photo-2891779.jpeg",
      filename: "sustainable_living_app.jpg",
    },
  },
  {
    title: "Opened a High-Tech Co-Working Space",
    description:
      "Launched a high-tech co-working space with advanced amenities for startups and freelancers.",
    image: {
      url: "https://images.pexels.com/photos/2616897/pexels-photo-2616897.jpeg",
      filename: "high_tech_co_working_space.jpg",
    },
  },
  {
    title: "Launched a Personalized Skincare Line",
    description:
      "Started a skincare line offering personalized products based on individual skin types and concerns.",
    image: {
      url: "https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg",
      filename: "personalized_skincare_line.jpg",
    },
  },
  {
    title: "Developed an Innovative Fitness App",
    description:
      "Created a fitness app with customized workout plans and health tracking features.",
    image: {
      url: "https://images.pexels.com/photos/2292363/pexels-photo-2292363.jpeg",
      filename: "innovative_fitness_app.jpg",
    },
  },
  {
    title: "Opened a Unique Art Supply Store",
    description:
      "Launched a store specializing in unique and high-quality art supplies for artists.",
    image: {
      url: "https://images.pexels.com/photos/3065738/pexels-photo-3065738.jpeg",
      filename: "art_supply_store.jpg",
    },
  },
  {
    title: "Created a Mobile App for Personal Finance",
    description:
      "Developed a mobile app for managing personal finances and budgeting.",
    image: {
      url: "https://images.pexels.com/photos/4393544/pexels-photo-4393544.jpeg",
      filename: "personal_finance_app.jpg",
    },
  },
  {
    title: "Opened a Specialty Tea Cafe",
    description:
      "Launched a cafe specializing in a wide range of specialty teas and blends.",
    image: {
      url: "https://images.pexels.com/photos/2253904/pexels-photo-2253904.jpeg",
      filename: "specialty_tea_cafe.jpg",
    },
  },
  {
    title: "Developed a Cutting-Edge E-Commerce Platform",
    description:
      "Created an advanced e-commerce platform with innovative features for online shopping.",
    image: {
      url: "https://images.pexels.com/photos/2292938/pexels-photo-2292938.jpeg",
      filename: "ecommerce_platform.jpg",
    },
  },
  {
    title: "Opened a Contemporary Music Studio",
    description:
      "Launched a studio focusing on contemporary music production and recording.",
    image: {
      url: "https://images.pexels.com/photos/3722415/pexels-photo-3722415.jpeg",
      filename: "contemporary_music_studio.jpg",
    },
  },
  {
    title: "Launched a Virtual Reality Fitness Experience",
    description:
      "Developed a virtual reality experience for immersive fitness workouts.",
    image: {
      url: "https://images.pexels.com/photos/5743064/pexels-photo-5743064.jpeg",
      filename: "vr_fitness_experience.jpg",
    },
  },
  {
    title: "Created a Mobile App for Food Delivery",
    description:
      "Developed a mobile app for convenient and efficient food delivery services.",
    image: {
      url: "https://images.pexels.com/photos/4118440/pexels-photo-4118440.jpeg",
      filename: "food_delivery_app.jpg",
    },
  },
  {
    title: "Opened a Specialty Books Store",
    description:
      "Launched a bookstore specializing in rare and specialty books.",
    image: {
      url: "https://images.pexels.com/photos/3055725/pexels-photo-3055725.jpeg",
      filename: "specialty_books_store.jpg",
    },
  },
  {
    title: "Developed a Mobile App for Mental Wellness",
    description:
      "Created an app focused on mental wellness with features for meditation and stress management.",
    image: {
      url: "https://images.pexels.com/photos/5450424/pexels-photo-5450424.jpeg",
      filename: "mental_wellness_app.jpg",
    },
  },
  {
    title: "Opened a Luxury Chocolatier",
    description:
      "Started a luxury chocolatier offering handcrafted chocolates and confections.",
    image: {
      url: "https://images.pexels.com/photos/4741131/pexels-photo-4741131.jpeg",
      filename: "luxury_chocolatier.jpg",
    },
  },
  {
    title: "Created a Mobile App for Remote Work",
    description:
      "Developed an app for managing remote work with features for collaboration and productivity.",
    image: {
      url: "https://images.pexels.com/photos/3791570/pexels-photo-3791570.jpeg",
      filename: "remote_work_app.jpg",
    },
  },
  {
    title: "Opened a High-End Home Decor Store",
    description:
      "Launched a store specializing in high-end home decor and furnishings.",
    image: {
      url: "https://images.pexels.com/photos/4146730/pexels-photo-4146730.jpeg",
      filename: "high_end_home_decor_store.jpg",
    },
  },
  {
    title: "Developed a Mobile App for Language Learning",
    description:
      "Created a mobile app offering interactive language learning and practice tools.",
    image: {
      url: "https://images.pexels.com/photos/4057640/pexels-photo-4057640.jpeg",
      filename: "language_learning_app.jpg",
    },
  },
  {
    title: "Opened a Unique Pop-Up Art Gallery",
    description:
      "Started a pop-up art gallery showcasing emerging artists and interactive exhibits.",
    image: {
      url: "https://images.pexels.com/photos/3970057/pexels-photo-3970057.jpeg",
      filename: "pop_up_art_gallery.jpg",
    },
  },
  {
    title: "Launched a Mobile App for Personal Safety",
    description:
      "Developed an app focused on personal safety with features for emergency alerts and location tracking.",
    image: {
      url: "https://images.pexels.com/photos/3925491/pexels-photo-3925491.jpeg",
      filename: "personal_safety_app.jpg",
    },
  },
  {
    title: "Created a High-Tech Smart Home Device",
    description:
      "Developed a smart home device with advanced automation and control features.",
    image: {
      url: "https://images.pexels.com/photos/3791347/pexels-photo-3791347.jpeg",
      filename: "smart_home_device.jpg",
    },
  },
  {
    title: "Opened a Specialty Wine Store",
    description:
      "Launched a store specializing in rare and premium wines from around the world.",
    image: {
      url: "https://images.pexels.com/photos/4055657/pexels-photo-4055657.jpeg",
      filename: "specialty_wine_store.jpg",
    },
  },
  {
    title: "Developed a Mobile App for Travel Planning",
    description:
      "Created an app for planning and organizing travel itineraries and bookings.",
    image: {
      url: "https://images.pexels.com/photos/3580463/pexels-photo-3580463.jpeg",
      filename: "travel_planning_app.jpg",
    },
  },
  {
    title: "Opened a Modern Art Gallery",
    description:
      "Launched a gallery focusing on contemporary and modern art exhibitions.",
    image: {
      url: "https://images.pexels.com/photos/5405166/pexels-photo-5405166.jpeg",
      filename: "modern_art_gallery.jpg",
    },
  },
  {
    title: "Created a Mobile App for Event Management",
    description:
      "Developed an app for managing and organizing events with features for guest lists and schedules.",
    image: {
      url: "https://images.pexels.com/photos/5671212/pexels-photo-5671212.jpeg",
      filename: "event_management_app.jpg",
    },
  },
  {
    title: "Opened a Craft Brewery",
    description:
      "Started a craft brewery specializing in unique and artisanal beers.",
    image: {
      url: "https://images.pexels.com/photos/3288181/pexels-photo-3288181.jpeg",
      filename: "craft_brewery.jpg",
    },
  },
  {
    title: "Launched a Mobile App for Pet Care",
    description:
      "Developed an app for managing pet care routines and health tracking.",
    image: {
      url: "https://images.pexels.com/photos/3985257/pexels-photo-3985257.jpeg",
      filename: "pet_care_app.jpg",
    },
  },
  {
    title: "Opened a Vintage Clothing Store",
    description:
      "Launched a store specializing in vintage and retro clothing pieces.",
    image: {
      url: "https://images.pexels.com/photos/1277454/pexels-photo-1277454.jpeg",
      filename: "vintage_clothing_store.jpg",
    },
  },
  {
    title: "Developed a Mobile App for Home Renovation",
    description:
      "Created an app for managing home renovation projects and design ideas.",
    image: {
      url: "https://images.pexels.com/photos/3824675/pexels-photo-3824675.jpeg",
      filename: "home_renovation_app.jpg",
    },
  },
  {
    title: "Opened a Gourmet Cheese Shop",
    description:
      "Launched a shop specializing in artisanal and gourmet cheeses from around the world.",
    image: {
      url: "https://images.pexels.com/photos/4146685/pexels-photo-4146685.jpeg",
      filename: "gourmet_cheese_shop.jpg",
    },
  },
  {
    title: "Created a Mobile App for Recipe Sharing",
    description:
      "Developed an app for sharing and discovering new recipes and cooking tips.",
    image: {
      url: "https://images.pexels.com/photos/3622450/pexels-photo-3622450.jpeg",
      filename: "recipe_sharing_app.jpg",
    },
  },
  {
    title: "Opened a High-End Sports Equipment Store",
    description:
      "Launched a store specializing in premium sports equipment and accessories.",
    image: {
      url: "https://images.pexels.com/photos/1674849/pexels-photo-1674849.jpeg",
      filename: "sports_equipment_store.jpg",
    },
  },
  {
    title: "Developed a Mobile App for Career Coaching",
    description:
      "Created an app offering career coaching and professional development tools.",
    image: {
      url: "https://images.pexels.com/photos/3205561/pexels-photo-3205561.jpeg",
      filename: "career_coaching_app.jpg",
    },
  },
  {
    title: "Opened a Specialty Fitness Studio",
    description:
      "Launched a fitness studio focusing on specialized workout classes and personal training.",
    image: {
      url: "https://images.pexels.com/photos/4344886/pexels-photo-4344886.jpeg",
      filename: "fitness_studio.jpg",
    },
  },
  {
    title: "Created a Mobile App for Art and Design",
    description:
      "Developed an app for art and design enthusiasts to explore and create digital artwork.",
    image: {
      url: "https://images.pexels.com/photos/3040728/pexels-photo-3040728.jpeg",
      filename: "art_design_app.jpg",
    },
  },
  {
    title: "Opened a Contemporary Jewelry Boutique",
    description:
      "Launched a boutique specializing in modern and handcrafted jewelry pieces.",
    image: {
      url: "https://images.pexels.com/photos/4347397/pexels-photo-4347397.jpeg",
      filename: "jewelry_boutique.jpg",
    },
  },
  {
    title: "Developed a Mobile App for Fitness Challenges",
    description:
      "Created an app for participating in fitness challenges and tracking progress.",
    image: {
      url: "https://images.pexels.com/photos/4166026/pexels-photo-4166026.jpeg",
      filename: "fitness_challenges_app.jpg",
    },
  },
  {
    title: "Opened a Luxury Pet Boutique",
    description:
      "Launched a boutique offering luxury pet accessories and gourmet treats.",
    image: {
      url: "https://images.pexels.com/photos/4824935/pexels-photo-4824935.jpeg",
      filename: "luxury_pet_boutique.jpg",
    },
  },
  {
    title: "Created a Mobile App for Home Automation",
    description:
      "Developed an app for controlling and automating home devices.",
    image: {
      url: "https://images.pexels.com/photos/4187848/pexels-photo-4187848.jpeg",
      filename: "home_automation_app.jpg",
    },
  },
  {
    title: "Opened a Specialty Vegan Bakery",
    description:
      "Launched a bakery specializing in vegan and plant-based baked goods.",
    image: {
      url: "https://images.pexels.com/photos/4525931/pexels-photo-4525931.jpeg",
      filename: "vegan_bakery.jpg",
    },
  },
  {
    title: "Developed a Mobile App for Educational Games",
    description:
      "Created an app offering educational games for children and learners.",
    image: {
      url: "https://images.pexels.com/photos/4370771/pexels-photo-4370771.jpeg",
      filename: "educational_games_app.jpg",
    },
  },
  {
    title: "Opened a Boutique Art Supply Store",
    description:
      "Launched a boutique store specializing in high-quality art supplies and materials.",
    image: {
      url: "https://images.pexels.com/photos/3155724/pexels-photo-3155724.jpeg",
      filename: "boutique_art_supply_store.jpg",
    },
  },
  {
    title: "Created a Mobile App for Cooking Classes",
    description:
      "Developed an app for scheduling and participating in cooking classes.",
    image: {
      url: "https://images.pexels.com/photos/3027281/pexels-photo-3027281.jpeg",
      filename: "cooking_classes_app.jpg",
    },
  },
  {
    title: "Opened a Luxury Travel Concierge Service",
    description:
      "Launched a high-end concierge service for personalized luxury travel planning.",
    image: {
      url: "https://images.pexels.com/photos/2882093/pexels-photo-2882093.jpeg",
      filename: "luxury_travel_concierge_service.jpg",
    },
  },
  {
    title: "Developed a Mobile App for Personalized Nutrition",
    description:
      "Created an app offering personalized nutrition plans and dietary advice.",
    image: {
      url: "https://images.pexels.com/photos/3823421/pexels-photo-3823421.jpeg",
      filename: "personalized_nutrition_app.jpg",
    },
  },
  {
    title: "Opened a Contemporary Dance Studio",
    description:
      "Launched a dance studio focusing on contemporary and modern dance styles.",
    image: {
      url: "https://images.pexels.com/photos/3184356/pexels-photo-3184356.jpeg",
      filename: "contemporary_dance_studio.jpg",
    },
  },
  {
    title: "Created a Mobile App for Social Networking",
    description:
      "Developed an app for social networking and connecting with friends.",
    image: {
      url: "https://images.pexels.com/photos/4117668/pexels-photo-4117668.jpeg",
      filename: "social_networking_app.jpg",
    },
  },
  {
    title: "Opened a High-End Home Theater Store",
    description:
      "Launched a store specializing in high-end home theater systems and accessories.",
    image: {
      url: "https://images.pexels.com/photos/2575787/pexels-photo-2575787.jpeg",
      filename: "home_theater_store.jpg",
    },
  },
  {
    title: "Developed a Mobile App for Personal Growth",
    description:
      "Created an app offering tools and resources for personal development and growth.",
    image: {
      url: "https://images.pexels.com/photos/3132812/pexels-photo-3132812.jpeg",
      filename: "personal_growth_app.jpg",
    },
  },
  {
    title: "Opened a Specialty Coffee Shop",
    description:
      "Launched a coffee shop focusing on specialty brews and unique coffee blends.",
    image: {
      url: "https://images.pexels.com/photos/3746050/pexels-photo-3746050.jpeg",
      filename: "specialty_coffee_shop.jpg",
    },
  },
  {
    title: "Created a Mobile App for Mental Health Support",
    description:
      "Developed an app offering mental health support and wellness resources.",
    image: {
      url: "https://images.pexels.com/photos/4042957/pexels-photo-4042957.jpeg",
      filename: "mental_health_support_app.jpg",
    },
  },
  {
    title: "Opened a Premium Cigar Lounge",
    description:
      "Launched a lounge specializing in premium cigars and luxury smoking accessories.",
    image: {
      url: "https://images.pexels.com/photos/2618878/pexels-photo-2618878.jpeg",
      filename: "premium_cigar_lounge.jpg",
    },
  },
  {
    title: "Developed a Mobile App for Financial Planning",
    description:
      "Created an app for managing personal finances and investment planning.",
    image: {
      url: "https://images.pexels.com/photos/3797732/pexels-photo-3797732.jpeg",
      filename: "financial_planning_app.jpg",
    },
  },
  {
    title: "Opened a Modern Furniture Store",
    description:
      "Launched a store specializing in contemporary and modern furniture pieces.",
    image: {
      url: "https://images.pexels.com/photos/3719667/pexels-photo-3719667.jpeg",
      filename: "modern_furniture_store.jpg",
    },
  },
  {
    title: "Created a Mobile App for Guided Meditation",
    description:
      "Developed an app offering guided meditation sessions and relaxation techniques.",
    image: {
      url: "https://images.pexels.com/photos/4346852/pexels-photo-4346852.jpeg",
      filename: "guided_meditation_app.jpg",
    },
  },
  {
    title: "Opened a High-End Cosmetic Store",
    description:
      "Launched a store specializing in luxury cosmetics and beauty products.",
    image: {
      url: "https://images.pexels.com/photos/3033515/pexels-photo-3033515.jpeg",
      filename: "cosmetic_store.jpg",
    },
  },
  {
    title: "Developed a Mobile App for Virtual Fitness Training",
    description:
      "Created an app for virtual fitness training and personalized workout plans.",
    image: {
      url: "https://images.pexels.com/photos/3791241/pexels-photo-3791241.jpeg",
      filename: "virtual_fitness_training_app.jpg",
    },
  },
  {
    title: "Opened a Specialty Bookstore",
    description:
      "Launched a bookstore specializing in rare and collectible books.",
    image: {
      url: "https://images.pexels.com/photos/1054791/pexels-photo-1054791.jpeg",
      filename: "specialty_bookstore.jpg",
    },
  },
  {
    title: "Created a Mobile App for Home Gardening",
    description: "Developed an app for home gardening tips and plant care.",
    image: {
      url: "https://images.pexels.com/photos/5966015/pexels-photo-5966015.jpeg",
      filename: "home_gardening_app.jpg",
    },
  },
  {
    title: "Opened a Contemporary Art Supply Store",
    description:
      "Launched a store specializing in contemporary art supplies and materials.",
    image: {
      url: "https://images.pexels.com/photos/4167066/pexels-photo-4167066.jpeg",
      filename: "contemporary_art_supply_store.jpg",
    },
  },
  {
    title: "Developed a Mobile App for Personalized Fitness Plans",
    description:
      "Created an app for designing and tracking personalized fitness plans.",
    image: {
      url: "https://images.pexels.com/photos/4344894/pexels-photo-4344894.jpeg",
      filename: "personalized_fitness_plans_app.jpg",
    },
  },
  {
    title: "Opened a Specialty Sushi Bar",
    description:
      "Launched a sushi bar focusing on high-quality and innovative sushi dishes.",
    image: {
      url: "https://images.pexels.com/photos/3650555/pexels-photo-3650555.jpeg",
      filename: "sushi_bar.jpg",
    },
  },
  {
    title: "Created a Mobile App for Local Events",
    description:
      "Developed an app for discovering and attending local events and activities.",
    image: {
      url: "https://images.pexels.com/photos/1031224/pexels-photo-1031224.jpeg",
      filename: "local_events_app.jpg",
    },
  },
  {
    title: "Opened a Specialty Kitchenware Store",
    description:
      "Launched a store specializing in high-quality kitchenware and cooking tools.",
    image: {
      url: "https://images.pexels.com/photos/6040291/pexels-photo-6040291.jpeg",
      filename: "kitchenware_store.jpg",
    },
  },
  {
    title: "Developed a Mobile App for Digital Art Creation",
    description: "Created an app for digital art creation and editing.",
    image: {
      url: "https://images.pexels.com/photos/3619427/pexels-photo-3619427.jpeg",
      filename: "digital_art_creation_app.jpg",
    },
  },
  {
    title: "Opened a High-End Audio Equipment Store",
    description:
      "Launched a store specializing in premium audio equipment and accessories.",
    image: {
      url: "https://images.pexels.com/photos/5483975/pexels-photo-5483975.jpeg",
      filename: "audio_equipment_store.jpg",
    },
  },
  {
    title: "Created a Mobile App for Yoga and Meditation",
    description:
      "Developed an app for yoga and meditation practices with guided sessions and routines.",
    image: {
      url: "https://images.pexels.com/photos/4392597/pexels-photo-4392597.jpeg",
      filename: "yoga_meditation_app.jpg",
    },
  },
  {
    title: "Opened a Modern Home Decor Store",
    description:
      "Launched a store specializing in modern and stylish home decor items.",
    image: {
      url: "https://images.pexels.com/photos/3100804/pexels-photo-3100804.jpeg",
      filename: "home_decor_store.jpg",
    },
  },
  {
    title: "Developed a Mobile App for Language Learning",
    description: "Created an app for learning and practicing new languages.",
    image: {
      url: "https://images.pexels.com/photos/3693071/pexels-photo-3693071.jpeg",
      filename: "language_learning_app.jpg",
    },
  },
  {
    title: "Opened a High-End Watch Boutique",
    description:
      "Launched a boutique specializing in luxury watches and timepieces.",
    image: {
      url: "https://images.pexels.com/photos/3481582/pexels-photo-3481582.jpeg",
      filename: "watch_boutique.jpg",
    },
  },
  {
    title: "Created a Mobile App for Virtual Reality Experiences",
    description:
      "Developed an app for immersive virtual reality experiences and games.",
    image: {
      url: "https://images.pexels.com/photos/3655614/pexels-photo-3655614.jpeg",
      filename: "virtual_reality_app.jpg",
    },
  },
  {
    title: "Opened a Specialty Health Food Store",
    description:
      "Launched a store focusing on health foods and organic products.",
    image: {
      url: "https://images.pexels.com/photos/1543888/pexels-photo-1543888.jpeg",
      filename: "health_food_store.jpg",
    },
  },
  {
    title: "Developed a Mobile App for Art Therapy",
    description:
      "Created an app for art therapy practices and creative expression.",
    image: {
      url: "https://images.pexels.com/photos/2529182/pexels-photo-2529182.jpeg",
      filename: "art_therapy_app.jpg",
    },
  },
  {
    title: "Opened a Specialty Outdoor Gear Store",
    description: "Launched a store specializing in outdoor and adventure gear.",
    image: {
      url: "https://images.pexels.com/photos/6799298/pexels-photo-6799298.jpeg",
      filename: "outdoor_gear_store.jpg",
    },
  },
  {
    title: "Created a Mobile App for Smart Home Integration",
    description:
      "Developed an app for integrating and managing smart home devices.",
    image: {
      url: "https://images.pexels.com/photos/3184351/pexels-photo-3184351.jpeg",
      filename: "smart_home_integration_app.jpg",
    },
  },
  {
    title: "Opened a Contemporary Ceramic Studio",
    description:
      "Launched a studio specializing in contemporary ceramic art and pottery.",
    image: {
      url: "https://images.pexels.com/photos/5799336/pexels-photo-5799336.jpeg",
      filename: "ceramic_studio.jpg",
    },
  },
  {
    title: "Developed a Mobile App for Personal Safety",
    description:
      "Created an app for personal safety with emergency features and alerts.",
    image: {
      url: "https://images.pexels.com/photos/2109221/pexels-photo-2109221.jpeg",
      filename: "personal_safety_app.jpg",
    },
  },
  {
    title: "Opened a Specialty Wine Bar",
    description: "Launched a wine bar specializing in unique and rare wines.",
    image: {
      url: "https://images.pexels.com/photos/3679630/pexels-photo-3679630.jpeg",
      filename: "wine_bar.jpg",
    },
  },
  {
    title: "Created a Mobile App for Cooking Recipes",
    description:
      "Developed an app for discovering and sharing cooking recipes.",
    image: {
      url: "https://images.pexels.com/photos/4171511/pexels-photo-4171511.jpeg",
      filename: "cooking_recipes_app.jpg",
    },
  },
  {
    title: "Opened a Premium Pet Store",
    description:
      "Launched a store specializing in high-quality pet products and accessories.",
    image: {
      url: "https://images.pexels.com/photos/3625101/pexels-photo-3625101.jpeg",
      filename: "premium_pet_store.jpg",
    },
  },
  {
    title: "Developed a Mobile App for Travel Planning",
    description:
      "Created an app for planning and organizing travel itineraries.",
    image: {
      url: "https://images.pexels.com/photos/4648764/pexels-photo-4648764.jpeg",
      filename: "travel_planning_app.jpg",
    },
  },
  {
    title: "Opened a Modern Art Gallery",
    description:
      "Launched a gallery specializing in modern and contemporary art.",
    image: {
      url: "https://images.pexels.com/photos/1115902/pexels-photo-1115902.jpeg",
      filename: "modern_art_gallery.jpg",
    },
  },
  {
    title: "Created a Mobile App for Personal Finance Management",
    description:
      "Developed an app for managing personal finances and budgeting.",
    image: {
      url: "https://images.pexels.com/photos/4491474/pexels-photo-4491474.jpeg",
      filename: "personal_finance_management_app.jpg",
    },
  },
  {
    title: "Opened a Luxury Candle Shop",
    description: "Launched a shop specializing in handcrafted luxury candles.",
    image: {
      url: "https://images.pexels.com/photos/5721672/pexels-photo-5721672.jpeg",
      filename: "luxury_candle_shop.jpg",
    },
  },
  {
    title: "Developed a Mobile App for Online Learning",
    description: "Created an app for online courses and educational resources.",
    image: {
      url: "https://images.pexels.com/photos/3807694/pexels-photo-3807694.jpeg",
      filename: "online_learning_app.jpg",
    },
  },
  {
    title: "Opened a Boutique Chocolate Shop",
    description:
      "Launched a shop specializing in gourmet and artisanal chocolates.",
    image: {
      url: "https://images.pexels.com/photos/5714241/pexels-photo-5714241.jpeg",
      filename: "chocolate_shop.jpg",
    },
  },
  {
    title: "Created a Mobile App for Fitness Challenges",
    description:
      "Developed an app for setting and tracking fitness challenges and goals.",
    image: {
      url: "https://images.pexels.com/photos/3791754/pexels-photo-3791754.jpeg",
      filename: "fitness_challenges_app.jpg",
    },
  },
  {
    title: "Opened a Modern Jewelry Store",
    description:
      "Launched a store specializing in contemporary and designer jewelry.",
    image: {
      url: "https://images.pexels.com/photos/4463795/pexels-photo-4463795.jpeg",
      filename: "modern_jewelry_store.jpg",
    },
  },
  {
    title: "Developed a Mobile App for Recipe Sharing",
    description:
      "Created an app for sharing and discovering recipes from around the world.",
    image: {
      url: "https://images.pexels.com/photos/3920970/pexels-photo-3920970.jpeg",
      filename: "recipe_sharing_app.jpg",
    },
  },
  {
    title: "Opened a Specialty Vintage Store",
    description: "Launched a store specializing in vintage and retro items.",
    image: {
      url: "https://images.pexels.com/photos/4073063/pexels-photo-4073063.jpeg",
      filename: "vintage_store.jpg",
    },
  },
  {
    title: "Created a Mobile App for Meditation and Mindfulness",
    description:
      "Developed an app for meditation practices and mindfulness techniques.",
    image: {
      url: "https://images.pexels.com/photos/4100942/pexels-photo-4100942.jpeg",
      filename: "meditation_mindfulness_app.jpg",
    },
  },
  {
    title: "Opened a High-End Skateboard Store",
    description:
      "Launched a store specializing in premium skateboards and accessories.",
    image: {
      url: "https://images.pexels.com/photos/3787175/pexels-photo-3787175.jpeg",
      filename: "skateboard_store.jpg",
    },
  },
  {
    title: "Developed a Mobile App for Event Planning",
    description:
      "Created an app for organizing and managing events and celebrations.",
    image: {
      url: "https://images.pexels.com/photos/5718502/pexels-photo-5718502.jpeg",
      filename: "event_planning_app.jpg",
    },
  },
  {
    title: "Opened a Contemporary Art Studio",
    description:
      "Launched a studio specializing in contemporary art exhibitions and workshops.",
    image: {
      url: "https://images.pexels.com/photos/3184302/pexels-photo-3184302.jpeg",
      filename: "contemporary_art_studio.jpg",
    },
  },
  {
    title: "Created a Mobile App for Wellness Tracking",
    description:
      "Developed an app for tracking and improving overall wellness and health.",
    image: {
      url: "https://images.pexels.com/photos/4612294/pexels-photo-4612294.jpeg",
      filename: "wellness_tracking_app.jpg",
    },
  },
];

async function successSeeder() {
  try {
    // Clear existing success stories
    await Success.deleteMany({});
    logger.info("Existing success stories cleared.");

    // Fetch all users
    const users = await User.find({});
    const userIds = users.map((user) => user._id);

    if (userIds.length === 0) {
      logger.warn("No users found to assign success stories to.");
      return;
    }

    for (const successStory of successData) {
      // Pick a random user as the owner of the success story
      const randomUser = users[Math.floor(Math.random() * users.length)];
      successStory.owner = randomUser._id;

      // Randomly assign some users to like the success story
      const randomLikes = [];
      const numberOfLikes = Math.floor(Math.random() * userIds.length); // Random number of likes
      for (let i = 0; i < numberOfLikes; i++) {
        const randomLiker = userIds[Math.floor(Math.random() * userIds.length)];
        if (!randomLikes.includes(randomLiker)) {
          randomLikes.push(randomLiker);
        }
      }
      successStory.likes = randomLikes;

      // Create the success story
      const newSuccessStory = await Success.create(successStory);
      logger.info(
        `Success story "${successStory.title}" added, created by ${randomUser.username}.`
      );

      // Optionally, if you want to handle other relationships or further modifications, you can do so here.
    }

    logger.info("Success stories seeded successfully!");
  } catch (error) {
    logger.error("Error seeding success stories:", error);
  }
}

module.exports = successSeeder;
