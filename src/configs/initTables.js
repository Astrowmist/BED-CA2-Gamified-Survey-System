const pool = require("../services/db");

const SQLSTATEMENT = `
-- Drop tables if they exist
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS UserAnswer;
DROP TABLE IF EXISTS SurveyQuestion;
DROP TABLE IF EXISTS Quest;
DROP TABLE IF EXISTS OwnedPet;
DROP TABLE IF EXISTS Pets;
DROP TABLE IF EXISTS Store;
DROP TABLE IF EXISTS CompletedQuest;
DROP TABLE IF EXISTS Reviews;

CREATE TABLE User (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username TEXT,
  password TEXT,
  points INT
);

CREATE TABLE UserAnswer (
  answer_id INT AUTO_INCREMENT PRIMARY KEY,
  answered_question_id INT NOT NULL,
  participant_id INT NOT NULL,
  answer BOOL NOT NULL,
  creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  additional_notes TEXT
);

CREATE TABLE SurveyQuestion (
  question_id INT AUTO_INCREMENT PRIMARY KEY,
  creator_id INT NOT NULL,
  question TEXT NOT NULL
);

CREATE TABLE Reviews (
  id INT PRIMARY KEY AUTO_INCREMENT,
  review_amt INT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE OwnedPet (
  owned_pet_id INT PRIMARY KEY AUTO_INCREMENT,
  owner_id INT NOT NULL,
  pet_id INT NOT NULL,
  pet_level INT NOT NULL,
  pet_hp INT NOT NULL,
  pet_atk INT NOT NULL,
  pet_def INT NOT NULL,
  last_fed timestamp DEFAULT CURRENT_TIMESTAMP,
  last_showered timestamp DEFAULT CURRENT_TIMESTAMP,
  last_time_spent timestamp DEFAULT CURRENT_TIMESTAMP,
  armour_id INT,
  armour_atk INT,
  armour_def INT
);

CREATE TABLE Pets (
  pet_id INT PRIMARY KEY AUTO_INCREMENT,
  pet_name TEXT NOT NULL,
  category TEXT NOT NULL,
  type1 TEXT NOT NULL,
  type2 TEXT,
  type3 TEXT,
  hp INT NOT NULL,
  atk INT NOT NULL,
  def INT NOT NULL
);

CREATE TABLE Store (
  item_id INT PRIMARY KEY AUTO_INCREMENT,
  item_name TEXT NOT NULL,
  item_desc TEXT NOT NULL,
  cost INT,
  atk INT,
  def INT,
  category TEXT NOT NULL
);

CREATE TABLE Quest (
  quest_id int PRIMARY KEY AUTO_INCREMENT,
  quest_name TEXT NOT NULL,
  quest_desc TEXT NOT NULL,
  boss_atk INT NOT NULL,
  boss_def INT NOT NULL,
  boss_hp INT NOT NULL
);

CREATE TABLE CompletedQuest (
  completed_quest_id INT PRIMARY KEY AUTO_INCREMENT,
  quest_id INT NOT NULL,
  pet_id INT NOT NULL
);

-- Insert data into SurveyQuestion table
INSERT INTO SurveyQuestion (creator_id,question) VALUES
(1,'Do you buy fruits from FC6?'),
(1,'Is the fried chicken at FC5 salty?'),
(2,'Did you recycled any e-waste?'),
(2,'Do you turn off lights and appliances when not in use?'),
(2,'Have you visit the cafe at Moberly?'); 


-- Insert data into Pets table
INSERT INTO Pets (pet_name,category,type1,type2,type3,hp,atk,def) VALUES
('Dog', 'common', 'Melee', NULL, NULL, 20, 30, 25),
('Cat', 'common', 'Melee', NULL, NULL, 18, 25, 32),
('Flamehound', 'common', 'Fire', 'Melee', NULL, 25, 35, 20),
('Aquacat', 'common', 'Water', 'Melee', NULL, 22, 28, 30),
('Twister', 'rare', 'Wind', 'Melee', NULL, 33, 41, 32),
('Shadowclaw', 'rare', 'Dark', 'Melee', NULL, 31, 36, 35),
('Dewdrop', 'rare', 'Water', 'Magic', NULL, 30, 39, 37),
('Electrowolf', 'very rare', 'Electric', 'Melee', NULL, 60, 73, 68),
('Terrafang', 'very rare', 'Earth', 'Melee', NULL, 72, 76, 62),
('Moonshadow', 'unique', 'Dark', 'Melee', NULL, 92, 118, 100),
('Thunderstorm', 'mythic', 'Electric', 'Water', NULL, 180, 195, 185),
('Nova', 'god', 'Cosmic', 'Fire', 'Magic', 270, 295, 255);



-- Insert data into Store table
INSERT INTO Store (item_name, item_desc, cost, atk, def, category) VALUES
('Common Chest', 'Has a chance to drop a common or rare pet', 50, NULL, NULL, 'common'),
('Premium Chest', 'Has a chance to drop a common, rare, very rare, or unique pet', 100, NULL, NULL, 'premium'),
('Ultimate Chest', 'Has a chance to drop a very rare, unique, mythic, or god pet', 150, NULL, NULL, 'ultimate'),
('Leather Armor', 'Basic leather armor set', 20, 20, 30, 'common'),
('Iron Armor', 'Sturdy iron armor set', 25, 25, 35, 'common'),
('Chainmail', 'Classic chainmail armor set', 42, 60, 50, 'rare'),
('Bone Armor', 'Bone armor set with mystical properties', 49, 65, 55, 'rare'),
('Phoenix Feather Armor', 'Light and resilient phoenix feather armor', 85, 95, 105, 'unique'),
('Titan Armor', 'Gigantic titan armor set', 140, 130, 140, 'mythic');


-- Insert data into Quest table
INSERT INTO Quest (quest_name, quest_desc, boss_atk, boss_def, boss_hp) VALUES
('The Goblin Menace', 'Defeat the Goblin King terrorizing the village.', 15, 10, 100),
('Bandit Hideout', 'Clear out the bandits hiding in the forest.', 20, 15, 120),
('Wolf Pack', 'Defeat the leader of the wild wolves.', 25, 20, 140),
('Dragon Hatchery', 'Eliminate the young dragons before they mature.', 55, 50, 260),
('Sorcerer''s Tower', 'Defeat the dark sorcerer at the top of the tower.', 65, 60, 300),
('Forest Guardian', 'Defeat the corrupted forest guardian.', 70, 65, 330),
('Ancient Pyramid', 'Overcome the guardian of the ancient pyramid.', 105, 100, 540),
('Dark Abyss', 'Defeat the abyssal demon in the dark abyss.', 110, 105, 570);
`;

pool.query(SQLSTATEMENT, (error, results, fields) => {
  if (error) {
    console.error("Error creating tables:", error);
  } else {
    console.log("Tables created successfully");
  }
  process.exit();
});
