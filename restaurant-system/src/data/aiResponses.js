// Simulated AI: a list of rules. The first rule whose keywords match the
// customer's question wins. Each rule builds its reply from live menu/order
// data, so answers stay correct when the admin changes the menu.

export const suggestedQuestions = [
  "What are today's specials?",
  "What vegetarian meals do you have?",
  "What do you recommend?",
  "Do you have gluten-free options?",
  "What is the most popular dessert?",
  "What did I order last time?",
];

// Dietary questions are about meals, so only look at Starters and Mains
const dietaryMeals = (menu, diet) =>
  menu.filter(
    (i) =>
      i.available &&
      (i.category === "Starters" || i.category === "Mains") &&
      i.dietary.includes(diet)
  );

const names = (items) => items.map((item) => item.name);

// ["A", "B", "C"] -> "A, B, and C"
function joinList(list) {
  if (list.length <= 1) return list.join("");
  if (list.length === 2) return `${list[0]} and ${list[1]}`;
  return `${list.slice(0, -1).join(", ")}, and ${list[list.length - 1]}`;
}

const rules = [
  {
    // "What did I order last time?"
    keywords: ["last time", "previous order", "last order", "ordered before", "order history"],
    reply: ({ orders }) => {
      if (orders.length === 0) {
        return "I don't see any previous orders yet. Why not try our most popular dishes?";
      }
      const last = orders[orders.length - 1];
      return `Your previous order was ${joinList(names(last.items))}.`;
    },
  },
  {
    // "What is the most popular dessert?"
    keywords: ["popular dessert", "best dessert", "favorite dessert", "favourite dessert"],
    reply: ({ menu }) => {
      const dessert = menu.find(
        (i) => i.available && i.category === "Desserts" && i.popular
      );
      return dessert
        ? `Our ${dessert.name} is our most popular dessert.`
        : "Take a look at our Desserts section. Everything there is delicious!";
    },
  },
  {
    // "What are today's specials?"
    keywords: ["special"],
    reply: ({ menu }) => {
      const specials = menu.filter((i) => i.available && i.isSpecial);
      if (specials.length === 0) return "We don't have a special today, but our full menu is available!";
      return `Today's special is ${joinList(
        specials.map((i) => `${i.name} for $${i.price.toFixed(2)}`)
      )}.`;
    },
  },
  {
    // "Do you have gluten-free options?"
    keywords: ["gluten"],
    reply: ({ menu }) => {
      const items = dietaryMeals(menu, "Gluten-Free");
      return items.length
        ? `Yes. Our gluten-free options are ${joinList(names(items))}.`
        : "Sorry, we don't have gluten-free items available right now.";
    },
  },
  {
    keywords: ["vegan"],
    reply: ({ menu }) => {
      const items = dietaryMeals(menu, "Vegan");
      return items.length
        ? `Our vegan options are ${joinList(names(items))}.`
        : "Sorry, we don't have vegan items available right now.";
    },
  },
  {
    // "What vegetarian meals do you have?"
    keywords: ["vegetarian", "veggie"],
    reply: ({ menu }) => {
      const items = dietaryMeals(menu, "Vegetarian");
      return items.length
        ? `We offer ${joinList(names(items))}.`
        : "Sorry, we don't have vegetarian items available right now.";
    },
  },
  {
    // "What do you recommend?"
    keywords: ["recommend", "suggest", "what should i"],
    reply: ({ menu }) => {
      const popular = menu.filter((i) => i.available && i.popular && i.category === "Mains");
      return popular.length
        ? `Based on popular orders, we recommend our ${joinList(names(popular))}.`
        : "Everything on our menu is great. Try something from our Mains!";
    },
  },
  {
    keywords: ["popular", "best seller", "bestseller"],
    reply: ({ menu }) => {
      const popular = menu.filter((i) => i.available && i.popular);
      return popular.length
        ? `Our most popular items are ${joinList(names(popular))}.`
        : "Browse our menu to find your new favourite!";
    },
  },
  {
    keywords: ["reserv", "book", "table", "birthday", "party"],
    reply: () =>
      "You can book a table, or a special event like a birthday or corporate gathering, on our Reservations page.",
  },
  {
    keywords: ["deliver", "pickup", "pick up"],
    reply: () =>
      "We offer both delivery and pickup. You can choose at checkout after adding items to your cart.",
  },
  {
    keywords: ["hello", "hi", "hey"],
    reply: () => "Hello! Ask me about specials, dietary options, or recommendations.",
  },
];

const fallback =
  "Sorry, I'm not sure about that. Try asking about today's specials, vegetarian or gluten-free options, or my recommendations.";

export function getAIResponse(question, context) {
  const text = question.toLowerCase();
  // "hi" / "hey" are short, so match them as whole words only
  const words = text.split(/[^a-z']+/);

  const rule = rules.find((r) =>
    r.keywords.some((k) =>
      k.length <= 3 ? words.includes(k) : text.includes(k)
    )
  );

  return rule ? rule.reply(context) : fallback;
}
