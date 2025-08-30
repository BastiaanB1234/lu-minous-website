-- Add sample blog posts to the database
-- Run this in your Supabase SQL Editor

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, content, excerpt, status, author_id, category_id, published_at) VALUES 
(
  'De Kracht van Verbinding: Omarm Liefde en Veiligheid in Relaties',
  'de-kracht-van-verbinding-omarm-liefde-en-veiligheid-in-relaties',
  'In een wereld waar we vaak gefocust zijn op individualiteit en zelfredzaamheid, vergeten we soms de fundamentele waarheid: we zijn allemaal verbonden. Deze verbinding is niet alleen fysiek, maar ook emotioneel en spiritueel. Het is de basis van alle betekenisvolle relaties in ons leven.

Wanneer we de kracht van verbinding erkennen, openen we onszelf voor een dieper begrip van liefde. Liefde is niet alleen een emotie, maar een bewuste keuze om open te staan voor de ander, om hun ervaringen te delen en om samen te groeien. Het is een reis van wederzijdse ontdekking en acceptatie.

Veiligheid in relaties ontstaat wanneer beide partners zich vrij voelen om hun ware zelf te tonen, zonder angst voor oordeel of afwijzing. Deze veiligheid bouwen we op door open communicatie, empathie en het vermogen om elkaars perspectief te begrijpen.

De transformatieve kracht van discipline in relaties ligt niet in controle of beperking, maar in de moed om consistent te zijn in onze toewijding aan groei en verbinding. Het is de discipline om elke dag opnieuw te kiezen voor liefde, begrip en geduld.

Wanneer we deze principes toepassen, transformeren onze relaties van oppervlakkige interacties naar diepe, betekenisvolle verbindingen die ons helpen groeien en bloeien.',
  'Ontdek hoe verbinding, liefde en veiligheid de basis vormen van betekenisvolle relaties en hoe discipline ons helpt om deze verbindingen te verdiepen.',
  'published',
  (SELECT id FROM authors WHERE name = 'Lu-minous' LIMIT 1),
  (SELECT id FROM categories WHERE slug = 'relaties' LIMIT 1),
  NOW()
),
(
  'Spirituele Groei: De Reis naar Innerlijke Vrede',
  'spirituele-groei-de-reis-naar-innerlijke-vrede',
  'Spirituele groei is een reis die begint met zelfbewustzijn en eindigt met een diep gevoel van innerlijke vrede. Het is een proces van voortdurende ontdekking en transformatie, waarbij we leren om ons ware zelf te omarmen.

Deze reis vereist moed om oude overtuigingen en patronen los te laten die ons niet meer dienen. Het betekent dat we bereid zijn om in de spiegel te kijken en de delen van onszelf te accepteren die we misschien niet leuk vinden.

Innerlijke vrede ontstaat niet door externe omstandigheden te veranderen, maar door onze reactie op deze omstandigheden te transformeren. Het is een staat van zijn die we kunnen cultiveren door meditatie, mindfulness en zelfreflectie.

Wanneer we groeien in spiritueel bewustzijn, ontwikkelen we een dieper begrip van ons doel en onze verbinding met alles om ons heen. We realiseren ons dat we niet gescheiden zijn van de wereld, maar er een integraal onderdeel van zijn.',
  'Ontdek de reis naar spirituele groei en hoe je innerlijke vrede kunt cultiveren door zelfbewustzijn en transformatie.',
  'published',
  (SELECT id FROM authors WHERE name = 'Lu-minous' LIMIT 1),
  (SELECT id FROM categories WHERE slug = 'spiritualiteit' LIMIT 1),
  NOW()
),
(
  'Persoonlijke Groei: Omarm Verandering en Ontwikkel Je Potentieel',
  'persoonlijke-groei-omarm-verandering-en-ontwikkel-je-potentieel',
  'Persoonlijke groei is een levenslang proces van zelfontdekking en ontwikkeling. Het betekent dat we bereid zijn om uit onze comfortzone te stappen en nieuwe uitdagingen aan te gaan die ons helpen groeien.

Verandering is onvermijdelijk in het leven, maar hoe we ermee omgaan bepaalt onze groei. Wanneer we verandering omarmen in plaats van ertegen te vechten, openen we onszelf voor nieuwe mogelijkheden en ervaringen.

Ons potentieel ontwikkelen betekent dat we onze sterke punten erkennen en gebruiken, terwijl we ook werken aan onze zwakke punten. Het betekent dat we bereid zijn om te leren van onze fouten en deze te zien als kansen voor groei.

De reis van persoonlijke groei is niet altijd gemakkelijk, maar het is altijd de moeite waard. Het leidt tot een dieper begrip van onszelf, meer zelfvertrouwen en een groter vermogen om bij te dragen aan de wereld om ons heen.',
  'Leer hoe je persoonlijke groei kunt omarmen door verandering te accepteren en je volledige potentieel te ontwikkelen.',
  'published',
  (SELECT id FROM authors WHERE name = 'Lu-minous' LIMIT 1),
  (SELECT id FROM categories WHERE slug = 'persoonlijke-groei' LIMIT 1),
  NOW()
);

-- Link posts to tags
INSERT INTO post_tags (post_id, tag_id) VALUES
((SELECT id FROM blog_posts WHERE slug = 'de-kracht-van-verbinding-omarm-liefde-en-veiligheid-in-relaties'), (SELECT id FROM tags WHERE slug = 'liefde')),
((SELECT id FROM blog_posts WHERE slug = 'de-kracht-van-verbinding-omarm-liefde-en-veiligheid-in-relaties'), (SELECT id FROM tags WHERE slug = 'verbinding')),
((SELECT id FROM blog_posts WHERE slug = 'spirituele-groei-de-reis-naar-innerlijke-vrede'), (SELECT id FROM tags WHERE slug = 'bewustzijn')),
((SELECT id FROM blog_posts WHERE slug = 'spirituele-groei-de-reis-naar-innerlijke-vrede'), (SELECT id FROM tags WHERE slug = 'wijsheid')),
((SELECT id FROM blog_posts WHERE slug = 'persoonlijke-groei-omarm-verandering-en-ontwikkel-je-potentieel'), (SELECT id FROM tags WHERE slug = 'groei')),
((SELECT id FROM blog_posts WHERE slug = 'persoonlijke-groei-omarm-verandering-en-ontwikkel-je-potentieel'), (SELECT id FROM tags WHERE slug = 'wijsheid'));
