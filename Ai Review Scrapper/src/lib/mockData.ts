interface Review {
  title: string;
  description: string;
  date: string;
  reviewer: string;
  rating: number;
  source: string;
}

const reviewTemplates = {
  positive: [
    {
      title: "Game-changer for our team collaboration",
      description: "We've been using this software for 6 months now and it has completely transformed how our team works together. The intuitive interface and powerful features have increased our productivity by at least 30%.",
    },
    {
      title: "Exceeded all expectations",
      description: "After trying multiple solutions, this one stands out. The customer support is exceptional, and the regular updates show they truly care about their users. Highly recommend for any growing business.",
    },
    {
      title: "Best investment we've made",
      description: "The ROI on this tool has been incredible. It paid for itself within the first month through time savings and improved workflow efficiency. The learning curve was minimal.",
    },
    {
      title: "Revolutionary approach to productivity",
      description: "What sets this apart is the attention to detail. Every feature feels thoughtfully designed. Our team adopted it quickly and we've seen remarkable improvements in project delivery times.",
    },
    {
      title: "Outstanding platform with great features",
      description: "The integration capabilities are fantastic. It connects seamlessly with our existing tools and the API documentation is comprehensive. Technical support has been responsive and helpful.",
    },
  ],
  mixed: [
    {
      title: "Great features, some room for improvement",
      description: "Overall a solid product. The core functionality is excellent, but the mobile app could use some work. Looking forward to seeing future updates address some of the UI inconsistencies.",
    },
    {
      title: "Powerful but has a learning curve",
      description: "Once you get past the initial setup, this tool is incredibly powerful. Wish there was better onboarding documentation, but their support team was helpful in getting us started.",
    },
    {
      title: "Good value with minor issues",
      description: "For the price point, this offers excellent value. There are occasional sync issues that can be frustrating, but they don't significantly impact our daily operations.",
    },
  ],
  negative: [
    {
      title: "Not quite ready for enterprise",
      description: "While the concept is promising, we encountered several bugs during our trial period. The team is responsive but some issues took weeks to resolve. Hoping for improvements.",
    },
    {
      title: "Disappointed with recent changes",
      description: "The latest update removed some features we relied on heavily. Communication about these changes was minimal. Considering alternatives if things don't improve.",
    },
  ],
};

const reviewerNames = [
  "Sarah M.", "David K.", "Jennifer L.", "Michael R.", "Emily W.",
  "Chris P.", "Amanda T.", "Robert H.", "Jessica B.", "Daniel S.",
  "Lauren F.", "Andrew C.", "Michelle N.", "Kevin O.", "Rachel G.",
];

function getRandomDate(start: Date, end: Date): string {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split("T")[0];
}

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function generateMockReviews(
  companyName: string,
  startDate: string,
  endDate: string,
  source: string,
  count: number = 12
): Review[] {
  const reviews: Review[] = [];
  const start = new Date(startDate);
  const end = new Date(endDate);

  for (let i = 0; i < count; i++) {
    let template;
    const rand = Math.random();
    
    if (rand < 0.6) {
      template = getRandomItem(reviewTemplates.positive);
    } else if (rand < 0.85) {
      template = getRandomItem(reviewTemplates.mixed);
    } else {
      template = getRandomItem(reviewTemplates.negative);
    }

    const rating = rand < 0.6 ? (Math.random() < 0.5 ? 5 : 4) 
                 : rand < 0.85 ? 3 
                 : (Math.random() < 0.5 ? 2 : 1);

    reviews.push({
      title: `${template.title} - ${companyName}`,
      description: template.description.replace("this software", companyName).replace("this tool", companyName),
      date: getRandomDate(start, end),
      reviewer: getRandomItem(reviewerNames),
      rating,
      source: source.charAt(0).toUpperCase() + source.slice(1),
    });
  }

  return reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
