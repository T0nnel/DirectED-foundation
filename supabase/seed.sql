-- Seed script for initial page content
-- Run this after creating the schema to populate default content

-- Home page content
INSERT INTO page_content (page_name, content_key, content_type, content_value) VALUES
('home', 'hero_slide_1_title', 'text', 'Empowering Africa''s Next Generation of Tech Leaders'),
('home', 'hero_slide_1_subtitle', 'text', 'World-class training and remote paid internships with US and European companies. Web development, UIX and Artificial Intelligence.'),
('home', 'hero_slide_2_title', 'text', 'Connecting Talent with Global Opportunities'),
('home', 'hero_slide_2_subtitle', 'text', 'We bridge the gap between high-potential talents and the world''s best education to fill skill gaps in the global jobs market.'),
('home', 'hero_slide_3_title', 'text', 'Transforming Lives Through Education'),
('home', 'hero_slide_3_subtitle', 'text', 'A world in which any person can realise their full potential, regardless of their draw in the lottery of life.'),
('home', 'mission_title', 'text', 'A World Where Potential Knows No Boundaries'),
('home', 'mission_description', 'text', 'We believe that every person deserves the opportunity to realize their full potential, regardless of where they were born. Through world-class education and direct connections to global opportunities, we''re breaking down barriers and building bridges to brighter futures.'),
('home', 'stats_students', 'text', '500+'),
('home', 'stats_partnerships', 'text', '50+'),
('home', 'stats_countries', 'text', '15+'),
('home', 'stats_placements', 'text', '200+')
ON CONFLICT (page_name, content_key) DO NOTHING;

-- Contact Us page content
INSERT INTO page_content (page_name, content_key, content_type, content_value) VALUES
('contact', 'hero_title', 'text', 'Get in Touch'),
('contact', 'hero_subtitle', 'text', 'Have questions? We''d love to hear from you. Send us a message and we''ll respond as soon as possible.'),
('contact', 'email', 'text', 'info@directed.dev'),
('contact', 'phone', 'text', '+254 700 000 000'),
('contact', 'location', 'text', 'Nairobi, Kenya'),
('contact', 'form_title', 'text', 'Send Us a Message'),
('contact', 'form_subtitle', 'text', 'Fill out the form below and we''ll get back to you shortly'),
('contact', 'social_title', 'text', 'Follow Us'),
('contact', 'social_subtitle', 'text', 'Stay connected on social media')
ON CONFLICT (page_name, content_key) DO NOTHING;

-- About page content
INSERT INTO page_content (page_name, content_key, content_type, content_value) VALUES
('about', 'hero_title', 'text', 'About DirectEd Development Foundation'),
('about', 'hero_subtitle', 'text', 'Empowering communities through education and technology'),
('about', 'mission_title', 'text', 'Our Mission'),
('about', 'mission_text', 'richtext', 'We are committed to breaking down barriers to education and creating pathways to opportunity for talented individuals, regardless of their circumstances.'),
('about', 'vision_title', 'text', 'Our Vision'),
('about', 'vision_text', 'richtext', 'A world where every person can realize their full potential through access to quality education and meaningful employment opportunities.')
ON CONFLICT (page_name, content_key) DO NOTHING;

-- Team page content
INSERT INTO page_content (page_name, content_key, content_type, content_value) VALUES
('team', 'hero_title', 'text', 'Meet Our Team'),
('team', 'hero_subtitle', 'text', 'The people behind DirectEd Development Foundation')
ON CONFLICT (page_name, content_key) DO NOTHING;

-- Programs page content
INSERT INTO page_content (page_name, content_key, content_type, content_value) VALUES
('programs', 'hero_title', 'text', 'Our Programs'),
('programs', 'hero_subtitle', 'text', 'Discover our training and internship opportunities')
ON CONFLICT (page_name, content_key) DO NOTHING;
