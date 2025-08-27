// Import blog posts data
const blogPosts = [
  {
    id: 1756273379,
    slug: "wijsheid-van-basbeem",
    title: "Wijsheid van basbeem",
    excerpt: "“Real love feels like peace,   and you deserve nothing less.”  Have you ever known a love that feels like peace? Not chaos. Not fear. Not walking on eggshells. But peace.  A love where you can brea...",
    content: `# Wijsheid van basbeem\n\n“Real love feels like peace, \n and you deserve nothing less.”\n\nHave you ever known a love that feels like peace?\nNot chaos. Not fear. Not walking on eggshells.\nBut peace.\n\nA love where you can breathe fully.\nWhere you are safe to be all of you.\nWhere even silence feels like home.\n\nI have never felt so much rest within myself,\nand with him.\nTogether or apart\nThe peace remains.\n\nI adore him for who he is.\nI respect the way he protects me,\nthe way he pushes me to grow,\nembraces me when I need to rest,\nchecks in simply to see if I’m okay.\n\nAnd I also respect the way he carries himself.\nHis humor that lights up the room.\nThe way he cares.... \ndeeply, \nsincerely,\nnot because he has to,\nbut because it’s who he is.\n\nThis is love.\nNot heavy. Not confusing.\nBut steady. Nurturing. Freeing.\n\nThe kind of love that makes you more of yourself,\nthat breathes life into your soul,\nthat feels like coming home.\n\nAnd my wish…\n\nis that everyone reading this may one day know this kind of love too.\n\nBecause you are worthy of it. Always...\n\n## Reflectie\n\nDeze wijsheid nodigt uit tot diepe reflectie en persoonlijke groei.`,
    author: "Lu Minous",
    published_at: "2025-08-27T07:42:48.663032",
    status: "published" as const,
    featured: false,
    created_at: "2025-08-27T07:42:48.663024",
    updated_at: "2025-08-27T07:42:48.663030",
    category: "Spiritual Growth",
    tags: ["Wijsheid", "Reflectie", "Persoonlijke Groei"],
    image_url: "https://oaidalleapiprodscus.blob.core.windows.net/private/org-qpnZl0SRgFEUdruNGsNxPlrL/user-B3zAwXGfLGOUGpjaopui3F1o/img-FnWiyV54ccfsMAeZoxzgYnnS.png?st=2025-08-27T04%3A42%3A59Z&se=2025-08-27T06%3A42%3A59Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=77e5a8ec-6bd1-4477-8afc-16703a64f029&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-08-27T04%3A02%3A18Z&ske=2025-08-28T04%3A02%3A18Z&sks=b&skv=2024-08-04&sig=Xz7JHWzOAyVDjoouVNhQXRHMfRRhhREqqvBLjEfEN0U%3D"
  },

  {
    id: 1756271852,
    slug: "wijsheid-van-basbeem",
    title: "Wijsheid van basbeem",
    excerpt: "“Real love feels like peace,   and you deserve nothing less.”  Have you ever known a love that feels like peace? Not chaos. Not fear. Not walking on eggshells. But peace.  A love where you can brea...",
    content: `# Wijsheid van basbeem\n\n“Real love feels like peace, \n and you deserve nothing less.”\n\nHave you ever known a love that feels like peace?\nNot chaos. Not fear. Not walking on eggshells.\nBut peace.\n\nA love where you can breathe fully.\nWhere you are safe to be all of you.\nWhere even silence feels like home.\n\nI have never felt so much rest within myself,\nand with him.\nTogether or apart\nThe peace remains.\n\nI adore him for who he is.\nI respect the way he protects me,\nthe way he pushes me to grow,\nembraces me when I need to rest,\nchecks in simply to see if I’m okay.\n\nAnd I also respect the way he carries himself.\nHis humor that lights up the room.\nThe way he cares.... \ndeeply, \nsincerely,\nnot because he has to,\nbut because it’s who he is.\n\nThis is love.\nNot heavy. Not confusing.\nBut steady. Nurturing. Freeing.\n\nThe kind of love that makes you more of yourself,\nthat breathes life into your soul,\nthat feels like coming home.\n\nAnd my wish…\n\nis that everyone reading this may one day know this kind of love too.\n\nBecause you are worthy of it. Always...\n\n## Reflectie\n\nDeze wijsheid nodigt uit tot diepe reflectie en persoonlijke groei.`,
    author: "Lu Minous",
    published_at: "2025-08-27T07:17:21.242965",
    status: "published" as const,
    featured: false,
    created_at: "2025-08-27T07:17:21.242959",
    updated_at: "2025-08-27T07:17:21.242963",
    category: "Spiritual Growth",
    tags: ["Wijsheid", "Reflectie", "Persoonlijke Groei"],
    image_url: "https://oaidalleapiprodscus.blob.core.windows.net/private/org-qpnZl0SRgFEUdruNGsNxPlrL/user-B3zAwXGfLGOUGpjaopui3F1o/img-Rjwzh4MCjz1nuRoMtqTjjFnY.png?st=2025-08-27T04%3A17%3A32Z&se=2025-08-27T06%3A17%3A32Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=f1dafa11-a0c2-4092-91d4-10981fbda051&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-08-26T08%3A59%3A46Z&ske=2025-08-27T08%3A59%3A46Z&sks=b&skv=2024-08-04&sig=Vw%2Bsoy28brBoxPL/5nt10E/tA3/M8CComV0864LnITI%3D"
  },

  {
    id: 1756271727,
    slug: "embracing-peaceful-love-a-journey-to-wholeness",
    title: "Embracing Peaceful Love: A Journey to Wholeness",
    excerpt: "Discover the transformative power of love that feels like peace and embrace the essence of true connection.",
    content: `Love that feels like peace is a rare gem in a world filled with chaos and noise. It is a sanctuary where you can fully exhale, where your soul finds solace in the presence of another. In a society that often glorifies tumultuous relationships, finding a love that offers tranquility and security can feel like discovering a hidden treasure. Basbeem's heartfelt message beautifully encapsulates the essence of a love that nurtures, uplifts, and liberates. It serves as a gentle reminder that we all deserve to experience a love that enriches our lives and helps us grow into the best versions of ourselves. As you reflect on Basbeem's words, consider the relationships in your life. Do they bring you peace? Do they make you feel safe and valued? Are you able to be your authentic self without fear of judgment or rejection? Cultivating a love that feels like peace requires a deep sense of self-awareness, empathy, and vulnerability. It involves honoring your boundaries, communicating openly, and actively listening to your partner's needs. It means showing up for each other with kindness, respect, and unwavering support. True love is not about possessiveness or control; it is about mutual growth, acceptance, and a shared journey towards wholeness. When you find someone who cherishes you for who you are, who uplifts you in times of need, and who encourages you to reach your full potential, hold onto that love with gratitude and reverence. Nurture it, cherish it, and allow it to blossom into a beautiful tapestry of shared experiences, laughter, and growth. And if you have yet to encounter a love that feels like peace, have faith that it exists. Trust in the divine timing of the universe and remain open to the possibilities that lie ahead. Your heart is deserving of a love that soothes your spirit, ignites your passion, and empowers you to shine brightly in the world. May Basbeem's words serve as a beacon of hope and inspiration as you continue your journey towards finding or nurturing a love that feels like peace.`,
    author: "Lu Minous",
    published_at: "2025-08-27T07:15:13.285891",
    status: "published" as const,
    featured: false,
    created_at: "2025-08-27T07:15:13.285881",
    updated_at: "2025-08-27T07:15:13.285889",
    category: "Personal Development",
    tags: ["love", "peace", "relationships", "personal growth", "spirituality"],
    image_url: "https://oaidalleapiprodscus.blob.core.windows.net/private/org-qpnZl0SRgFEUdruNGsNxPlrL/user-B3zAwXGfLGOUGpjaopui3F1o/img-Re5lwCO4cxrgd84iidTHT5TH.png?st=2025-08-27T04%3A15%3A27Z&se=2025-08-27T06%3A15%3A27Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=b1a0ae1f-618f-4548-84fd-8b16cacd5485&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-08-26T10%3A22%3A12Z&ske=2025-08-27T10%3A22%3A12Z&sks=b&skv=2024-08-04&sig=myIAwAI%2B2lEw3hhAwC/EEhnwLOFambKAs/SnQf5bwI0%3D"
  },

  {
    id: 1756271605,
    slug: "wijsheid-van-basbeem",
    title: "Wijsheid van basbeem",
    excerpt: "“Real love feels like peace,   and you deserve nothing less.”  Have you ever known a love that feels like peace? Not chaos. Not fear. Not walking on eggshells. But peace.  A love where you can brea...",
    content: `# Wijsheid van basbeem\n\n“Real love feels like peace, \n and you deserve nothing less.”\n\nHave you ever known a love that feels like peace?\nNot chaos. Not fear. Not walking on eggshells.\nBut peace.\n\nA love where you can breathe fully.\nWhere you are safe to be all of you.\nWhere even silence feels like home.\n\nI have never felt so much rest within myself,\nand with him.\nTogether or apart\nThe peace remains.\n\nI adore him for who he is.\nI respect the way he protects me,\nthe way he pushes me to grow,\nembraces me when I need to rest,\nchecks in simply to see if I’m okay.\n\nAnd I also respect the way he carries himself.\nHis humor that lights up the room.\nThe way he cares.... \ndeeply, \nsincerely,\nnot because he has to,\nbut because it’s who he is.\n\nThis is love.\nNot heavy. Not confusing.\nBut steady. Nurturing. Freeing.\n\nThe kind of love that makes you more of yourself,\nthat breathes life into your soul,\nthat feels like coming home.\n\nAnd my wish…\n\nis that everyone reading this may one day know this kind of love too.\n\nBecause you are worthy of it. Always...\n\n## Reflectie\n\nDeze wijsheid nodigt uit tot diepe reflectie en persoonlijke groei.`,
    author: "Lu Minous",
    published_at: "2025-08-27T07:13:13.349018",
    status: "published" as const,
    featured: false,
    created_at: "2025-08-27T07:13:13.349011",
    updated_at: "2025-08-27T07:13:13.349016",
    category: "Spiritual Growth",
    tags: ["Wijsheid", "Reflectie", "Persoonlijke Groei"],
    image_url: "https://oaidalleapiprodscus.blob.core.windows.net/private/org-qpnZl0SRgFEUdruNGsNxPlrL/user-B3zAwXGfLGOUGpjaopui3F1o/img-Fvq8uDuG2AtWaPrw551IbKN0.png?st=2025-08-27T04%3A13%3A25Z&se=2025-08-27T06%3A13%3A25Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=b1a0ae1f-618f-4548-84fd-8b16cacd5485&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-08-27T00%3A01%3A18Z&ske=2025-08-28T00%3A01%3A18Z&sks=b&skv=2024-08-04&sig=iGLvvsJpU6fnQgqQGZpMJQtlN9%2BheJAMgWzFR25293E%3D"
  },

  {
    id: 1756271502,
    slug: "wijsheid-van-basbeem",
    title: "Wijsheid van basbeem",
    excerpt: "“Real love feels like peace,   and you deserve nothing less.”  Have you ever known a love that feels like peace? Not chaos. Not fear. Not walking on eggshells. But peace.  A love where you can brea...",
    content: `# Wijsheid van basbeem\n\n“Real love feels like peace, \n and you deserve nothing less.”\n\nHave you ever known a love that feels like peace?\nNot chaos. Not fear. Not walking on eggshells.\nBut peace.\n\nA love where you can breathe fully.\nWhere you are safe to be all of you.\nWhere even silence feels like home.\n\nI have never felt so much rest within myself,\nand with him.\nTogether or apart\nThe peace remains.\n\nI adore him for who he is.\nI respect the way he protects me,\nthe way he pushes me to grow,\nembraces me when I need to rest,\nchecks in simply to see if I’m okay.\n\nAnd I also respect the way he carries himself.\nHis humor that lights up the room.\nThe way he cares.... \ndeeply, \nsincerely,\nnot because he has to,\nbut because it’s who he is.\n\nThis is love.\nNot heavy. Not confusing.\nBut steady. Nurturing. Freeing.\n\nThe kind of love that makes you more of yourself,\nthat breathes life into your soul,\nthat feels like coming home.\n\nAnd my wish…\n\nis that everyone reading this may one day know this kind of love too.\n\nBecause you are worthy of it. Always...\n\n## Reflectie\n\nDeze wijsheid nodigt uit tot diepe reflectie en persoonlijke groei.`,
    author: "Lu Minous",
    published_at: "2025-08-27T07:11:30.776720",
    status: "published" as const,
    featured: false,
    created_at: "2025-08-27T07:11:30.776692",
    updated_at: "2025-08-27T07:11:30.776718",
    category: "Spiritual Growth",
    tags: ["Wijsheid", "Reflectie", "Persoonlijke Groei"],
    image_url: "https://oaidalleapiprodscus.blob.core.windows.net/private/org-qpnZl0SRgFEUdruNGsNxPlrL/user-B3zAwXGfLGOUGpjaopui3F1o/img-nVTdAmTuMRibQI1Q2GwtO1Ou.png?st=2025-08-27T04%3A11%3A42Z&se=2025-08-27T06%3A11%3A42Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=b1a0ae1f-618f-4548-84fd-8b16cacd5485&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-08-26T08%3A43%3A54Z&ske=2025-08-27T08%3A43%3A54Z&sks=b&skv=2024-08-04&sig=w/rAVN4Y/StRZ%2BavXubiFyy/WWMPr7GErkD3DrnEdEo%3D"
  },

  {
    id: 1756271203,
    slug: "wijsheid-van-basbeem",
    title: "Wijsheid van basbeem",
    excerpt: "“Real love feels like peace,   and you deserve nothing less.”  Have you ever known a love that feels like peace? Not chaos. Not fear. Not walking on eggshells. But peace.  A love where you can brea...",
    content: `# Wijsheid van basbeem\n\n“Real love feels like peace, \n and you deserve nothing less.”\n\nHave you ever known a love that feels like peace?\nNot chaos. Not fear. Not walking on eggshells.\nBut peace.\n\nA love where you can breathe fully.\nWhere you are safe to be all of you.\nWhere even silence feels like home.\n\nI have never felt so much rest within myself,\nand with him.\nTogether or apart\nThe peace remains.\n\nI adore him for who he is.\nI respect the way he protects me,\nthe way he pushes me to grow,\nembraces me when I need to rest,\nchecks in simply to see if I’m okay.\n\nAnd I also respect the way he carries himself.\nHis humor that lights up the room.\nThe way he cares.... \ndeeply, \nsincerely,\nnot because he has to,\nbut because it’s who he is.\n\nThis is love.\nNot heavy. Not confusing.\nBut steady. Nurturing. Freeing.\n\nThe kind of love that makes you more of yourself,\nthat breathes life into your soul,\nthat feels like coming home.\n\nAnd my wish…\n\nis that everyone reading this may one day know this kind of love too.\n\nBecause you are worthy of it. Always...\n\n## Reflectie\n\nDeze wijsheid nodigt uit tot diepe reflectie en persoonlijke groei.`,
    author: "Lu Minous",
    published_at: "2025-08-27T07:06:33.004748",
    status: "published" as const,
    featured: false,
    created_at: "2025-08-27T07:06:33.004738",
    updated_at: "2025-08-27T07:06:33.004747",
    category: "Spiritual Growth",
    tags: ["Wijsheid", "Reflectie", "Persoonlijke Groei"]    image_url: "https://oaidalleapiprodscus.blob.core.windows.net/private/org-qpnZl0SRgFEUdruNGsNxPlrL/user-B3zAwXGfLGOUGpjaopui3F1o/img-KV2gN8Ieo236sDgoB115WKcZ.png?st=2025-08-27T04%3A06%3A43Z&se=2025-08-27T06%3A06%3A43Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=77e5a8ec-6bd1-4477-8afc-16703a64f029&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-08-26T10%3A25%3A45Z&ske=2025-08-27T10%3A25%3A45Z&sks=b&skv=2024-08-04&sig=ehXvdfBiAoUpe77evZvGYrAG%2BAjXIhW16fNGroLVUBM%3D",
  },

  {
    id: 1,
    slug: "spiritual-growth-journey",
    title: "Your Spiritual Growth Journey: A Complete Guide",
    excerpt: "Discover the essential steps to begin your spiritual transformation and unlock your inner potential.",
    content: "Embarking on a spiritual growth journey is one of the most profound decisions you can make in your life. It's a path that leads to deeper self-awareness, inner peace, and a connection to something greater than yourself.\n\n## Understanding Spiritual Growth\n\nSpiritual growth is not about following a specific religion or belief system. Instead, it's about developing your inner wisdom, expanding your consciousness, and aligning with your authentic self. It's a journey of self-discovery that can transform every aspect of your life.\n\n## The Foundation: Self-Awareness\n\nThe first step in any spiritual journey is developing self-awareness. This means taking time to reflect on your thoughts, emotions, and behaviors. It's about understanding your patterns, triggers, and the stories you tell yourself about who you are.\n\n## Daily Practices for Growth\n\nConsistency is key in spiritual growth. Here are some daily practices that can support your journey:\n\n- **Morning Reflection:** Start each day with 10-15 minutes of quiet reflection\n- **Mindful Breathing:** Practice conscious breathing throughout the day\n- **Gratitude Practice:** Write down three things you're grateful for each day\n- **Nature Connection:** Spend time in nature to ground yourself\n- **Evening Review:** Reflect on your day and what you learned\n\n## Overcoming Common Challenges\n\nEvery spiritual journey comes with challenges. You might experience doubt, resistance, or periods where you feel stuck. Remember that these are normal and often indicate that you're on the right path. Growth happens in cycles, not in a straight line.\n\n## Building Your Spiritual Community\n\nWhile spiritual growth is deeply personal, having a supportive community can make a significant difference. Connect with like-minded individuals who are also on their spiritual journey. Share your experiences, learn from others, and support each other through the ups and downs.\n\n## Measuring Your Progress\n\nSpiritual growth isn't always easy to measure, but there are signs that indicate you're moving forward:\n\n- Increased inner peace and calmness\n- Better emotional regulation\n- Deeper sense of purpose and meaning\n- Improved relationships with others\n- Greater compassion and empathy\n- Enhanced intuition and inner knowing\n\n## The Journey Continues\n\nRemember that spiritual growth is a lifelong journey, not a destination. There's no finish line to cross or final level to achieve. Instead, it's about continuous evolution, learning, and deepening your connection to your authentic self and the world around you.\n\nAs you continue on your path, be patient with yourself. Trust the process and know that every step, no matter how small, is moving you forward. Your spiritual journey is unique to you, and there's no right or wrong way to proceed.",
    author: "Lu Minous",
    published_at: "2024-08-27T00:00:00.000Z",
    status: "published" as const,
    featured: true,
    created_at: "2024-08-27T00:00:00.000Z",
    updated_at: "2024-08-27T00:00:00.000Z",
    category: "Spiritual Growth",
    tags: ["Spiritual Growth", "Self-Awareness", "Daily Practices", "Community"],
    image_url: "/images/eye-of-horus-placeholder.png"
  },
  {
    id: 2,
    slug: "meditation-techniques",
    title: "5 Powerful Meditation Techniques for Beginners",
    excerpt: "Learn simple yet effective meditation practices that will help you find inner peace and clarity.",
    content: "Meditation is one of the most powerful tools for spiritual growth and inner peace. Whether you're a complete beginner or have some experience, these five techniques will help you establish a consistent meditation practice.\n\n## 1. Breath Awareness Meditation\n\nThis is the foundation of all meditation practices. Simply focus your attention on your breath, observing the natural rhythm of inhalation and exhalation. When your mind wanders, gently bring it back to your breath.\n\n**How to practice:**\n- Sit comfortably with your back straight\n- Close your eyes or keep them half-open\n- Focus on the sensation of breathing\n- Count your breaths from 1 to 10, then start over\n- Practice for 5-10 minutes daily\n\n## 2. Body Scan Meditation\n\nLie down comfortably and bring your awareness to different parts of your body, starting from your toes and moving up to your head. This practice helps you develop body awareness and release tension.\n\n**How to practice:**\n- Lie on your back in a comfortable position\n- Close your eyes and take a few deep breaths\n- Start with your toes, noticing any sensations\n- Slowly move your attention up through your body\n- Spend 10-15 seconds on each body part\n- Practice for 10-15 minutes\n\n## 3. Loving-Kindness Meditation\n\nThis practice involves sending love, compassion, and well-wishes to yourself and others. It's a powerful way to cultivate positive emotions and develop empathy.\n\n**How to practice:**\n- Sit comfortably and close your eyes\n- Start by directing loving-kindness to yourself\n- Repeat phrases like: 'May I be happy, may I be healthy, may I be at peace'\n- Then extend these wishes to others\n- Practice for 10-15 minutes\n\n## 4. Walking Meditation\n\nFor those who find sitting meditation challenging, walking meditation can be a great alternative. Walk slowly and mindfully, paying attention to each step and the sensations in your body.\n\n## 5. Mantra Meditation\n\nChoose a word or phrase that resonates with you and repeat it silently or aloud. This helps focus the mind and can have a calming effect on your nervous system.\n\n**How to practice:**\n- Choose a meaningful word or phrase\n- Sit comfortably and close your eyes\n- Repeat the mantra silently\n- When your mind wanders, return to the mantra\n- Practice for 10-15 minutes\n\n## Tips for Success\n\n- **Start small:** Begin with just 5 minutes daily\n- **Be consistent:** Practice at the same time each day\n- **Be patient:** Don't expect immediate results\n- **Find your style:** Experiment with different techniques\n- **Join a group:** Consider joining a meditation class\n\nRemember, meditation is a skill that develops with practice. Be gentle with yourself and celebrate each moment of mindfulness, no matter how brief.",
    author: "Lu Minous",
    published_at: "2024-08-26T00:00:00.000Z",
    status: "published" as const,
    featured: false,
    created_at: "2024-08-26T00:00:00.000Z",
    updated_at: "2024-08-26T00:00:00.000Z",
    category: "Meditation",
    tags: ["Meditation", "Beginners", "Breath Awareness", "Mindfulness"],
    image_url: "/images/eye-of-horus-placeholder.png"
  },
  {
    id: 3,
    slug: "community-connection",
    title: "Building Authentic Connections in Your Spiritual Community",
    excerpt: "How to create meaningful relationships with like-minded souls on your spiritual journey.",
    content: "Building authentic connections in your spiritual community is essential for growth and support. Here's how to create meaningful relationships that nourish your soul.\n\n## The Importance of Community\n\nSpiritual growth doesn't happen in isolation. We need others to reflect our journey, share wisdom, and provide support during challenging times. A spiritual community offers:\n\n- Shared experiences and understanding\n- Collective wisdom and knowledge\n- Emotional support and encouragement\n- Accountability and motivation\n- Celebration of milestones\n\n## Finding Your Tribe\n\nLook for people who resonate with your values and spiritual path. They might be found in:\n\n- Local meditation groups\n- Spiritual centers or churches\n- Online communities and forums\n- Workshops and retreats\n- Book clubs focused on spiritual topics\n\n## Building Authentic Relationships\n\nAuthentic connections are built on:\n\n- **Vulnerability:** Share your struggles and triumphs\n- **Active listening:** Truly hear what others are saying\n- **Non-judgment:** Accept others as they are\n- **Reciprocity:** Give and receive support equally\n- **Boundaries:** Respect your own and others' limits\n\n## Nurturing Your Connections\n\nOnce you've found your community, nurture these relationships:\n\n- **Regular check-ins:** Stay connected with regular communication\n- **Shared practices:** Meditate or practice together\n- **Celebrate together:** Mark important milestones\n- **Support during challenges:** Be there when others need you\n- **Grow together:** Share resources and insights\n\n## Overcoming Common Challenges\n\nBuilding community isn't always easy. Common challenges include:\n\n- **Finding the right people:** It may take time to find your tribe\n- **Different levels of commitment:** Not everyone will be at the same place\n- **Conflict resolution:** Disagreements are natural\n\n## Creating Your Own Community\n\nIf you can't find the right community, consider creating one:\n\n- Start a small meditation group\n- Host spiritual book discussions\n- Organize nature walks or retreats\n- Create an online space for connection\n- Lead workshops on topics you're passionate about\n\n## The Power of Connection\n\nRemember, authentic spiritual connections are one of the greatest gifts of the spiritual journey. They remind us that we're not alone, that our experiences are shared, and that together we can grow stronger and wiser.\n\nTake the first step today. Reach out to someone in your spiritual community, or if you don't have one yet, start building it. Your future self will thank you.",
    author: "Lu Minous",
    published_at: "2024-08-25T00:00:00.000Z",
    status: "published" as const,
    featured: false,
    created_at: "2024-08-25T00:00:00.000Z",
    updated_at: "2024-08-25T00:00:00.000Z",
    category: "Community",
    tags: ["Community", "Connection", "Relationships", "Support"],
    image_url: "/images/eye-of-horus-placeholder.png"
  }
] as const

export interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt?: string
  content: string
  author: string
  published_at?: string
  status: 'draft' | 'published'
  featured: boolean
  created_at: string
  updated_at: string
  category?: string
  tags?: string[]
  image_url?: string
}

export interface Category {
  id: number
  name: string
  slug: string
  description?: string
}

export interface Tag {
  id: number
  name: string
  slug: string
}

// Blog data service using JSON files
export class BlogDataService {
  private posts: BlogPost[] = blogPosts as unknown as BlogPost[]

  // Get all posts
  async getAllPosts(): Promise<BlogPost[]> {
    return this.posts.sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
  }

  // Get published posts only
  async getPublishedPosts(): Promise<BlogPost[]> {
    return this.posts
      .filter(post => post.status === 'published')
      .sort((a, b) => 
        new Date(b.published_at || b.created_at).getTime() - 
        new Date(a.published_at || a.created_at).getTime()
      )
  }

  // Get post by slug
  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    return this.posts.find(post => post.slug === slug) || null
  }

  // Get featured posts
  async getFeaturedPosts(): Promise<BlogPost[]> {
    return this.posts
      .filter(post => post.featured && post.status === 'published')
      .sort((a, b) => 
        new Date(b.published_at || b.created_at).getTime() - 
        new Date(a.published_at || a.created_at).getTime()
      )
  }

  // Get posts by category
  async getPostsByCategory(category: string): Promise<BlogPost[]> {
    return this.posts
      .filter(post => post.category === category && post.status === 'published')
      .sort((a, b) => 
        new Date(b.published_at || b.created_at).getTime() - 
        new Date(a.published_at || a.created_at).getTime()
      )
  }

  // Get posts by tag
  async getPostsByTag(tag: string): Promise<BlogPost[]> {
    return this.posts
      .filter(post => post.tags?.includes(tag) && post.status === 'published')
      .sort((a, b) => 
        new Date(b.published_at || b.created_at).getTime() - 
        new Date(a.published_at || a.created_at).getTime()
      )
  }

  // Get all categories
  async getAllCategories(): Promise<Category[]> {
    const categories = new Map<string, { count: number, name: string }>()
    
    this.posts.forEach(post => {
      if (post.category && post.status === 'published') {
        const existing = categories.get(post.category)
        if (existing) {
          existing.count++
        } else {
          categories.set(post.category, { count: 1, name: post.category })
        }
      }
    })

    return Array.from(categories.entries()).map(([slug, { count, name }]) => ({
      id: slug.length, // Simple ID generation
      name,
      slug: slug.toLowerCase().replace(/\s+/g, '-'),
      description: `${count} posts`
    }))
  }

  // Get all tags
  async getAllTags(): Promise<Tag[]> {
    const tags = new Map<string, { count: number, name: string }>()
    
    this.posts.forEach(post => {
      if (post.tags && post.status === 'published') {
        post.tags.forEach(tag => {
          const existing = tags.get(tag)
          if (existing) {
            existing.count++
          } else {
            tags.set(tag, { count: 1, name: tag })
          }
        })
      }
    })

    return Array.from(tags.entries()).map(([slug, { name }]) => ({
      id: slug.length, // Simple ID generation
      name,
      slug: slug.toLowerCase().replace(/\s+/g, '-')
    }))
  }

  // Search posts
  async searchPosts(query: string): Promise<BlogPost[]> {
    const lowercaseQuery = query.toLowerCase()
    
    return this.posts
      .filter(post => 
        post.status === 'published' && (
          post.title.toLowerCase().includes(lowercaseQuery) ||
          post.excerpt?.toLowerCase().includes(lowercaseQuery) ||
          post.content.toLowerCase().includes(lowercaseQuery) ||
          post.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
        )
      )
      .sort((a, b) => 
        new Date(b.published_at || b.created_at).getTime() - 
        new Date(a.published_at || a.created_at).getTime()
      )
  }

  // Get recent posts
  async getRecentPosts(limit: number = 5): Promise<BlogPost[]> {
    return this.posts
      .filter(post => post.status === 'published')
      .sort((a, b) => 
        new Date(b.published_at || b.created_at).getTime() - 
        new Date(a.published_at || a.created_at).getTime()
      )
      .slice(0, limit)
  }

  // Get related posts (by category or tags)
  async getRelatedPosts(currentPost: BlogPost, limit: number = 3): Promise<BlogPost[]> {
    const related = this.posts
      .filter(post => 
        post.id !== currentPost.id && 
        post.status === 'published' && (
          post.category === currentPost.category ||
          post.tags?.some(tag => currentPost.tags?.includes(tag))
        )
      )
      .sort((a, b) => 
        new Date(b.published_at || b.created_at).getTime() - 
        new Date(a.published_at || a.created_at).getTime()
      )
      .slice(0, limit)

    return related
  }
}

// Singleton instance
let dataServiceInstance: BlogDataService | null = null

export async function getBlogDataService(): Promise<BlogDataService> {
  if (!dataServiceInstance) {
    dataServiceInstance = new BlogDataService()
  }
  return dataServiceInstance
}
