export const sampleData = {
  "What are RESTful APIs?":
    "RESTful APIs are designed around the REST (Representational State Transfer) architecture, which uses HTTP requests to access and manipulate data. They follow a stateless, client-server, cacheable communications protocol.",

  "What is the weather":
    "The weather is sunny today.",

  "What is my location":
    "You are currently in Mumbai.",

  "How are you":
    "I am functioning properly!",

  "Why use object instead of array for chatbot data?":
    "Objects provide constant time O(1) lookup using keys, whereas arrays require iteration O(n) to find matching data.",

  "What is time complexity of object lookup?":
    "Accessing a value using an object key typically takes O(1) average time due to hash-based implementation.",

  "What is case insensitive search?":
    "Case insensitive search converts both input and stored keys to a common format such as lowercase before comparison.",

  "What happens if JSON has duplicate keys?":
    "Duplicate JSON keys are not allowed and the last key occurrence overwrites previous values.",

  "What is fuzzy search?":
    "Fuzzy search finds approximate matches using similarity algorithms such as Levenshtein distance instead of exact matching.",

  "What is difference between Map and Object?":
    "Map allows any data type as key and maintains insertion order, while Object primarily uses string or symbol keys.",

  "Why JSON used for configuration?":
    "JSON is lightweight, human readable, language independent, and easily parsed into JavaScript objects.",

  "What are limitations of static JSON chatbot?":
    "Static JSON lacks scalability, personalization, context awareness, and real-time learning capability.",

  "Where should static data live in React project?":
    "Static data should be stored inside dedicated folders such as data, constants, or mocks to maintain separation of concerns.",

  "How to lazy load large JSON?":
    "Large JSON files can be lazy loaded using dynamic import or fetched asynchronously to reduce bundle size.",

  "How to prevent re render due to static data?":
    "Place static data outside components or memoize it using useMemo to avoid recreation during renders.",

  "How to cache chatbot responses?":
    "Responses can be cached using localStorage, service workers, memoization, or backend caching systems like Redis.",

  "What is versioning in JSON data?":
    "Versioning involves adding version identifiers to JSON data to manage updates and prevent cache inconsistencies.",

  "How to internationalize chatbot responses?":
    "Maintain language specific JSON files and switch between them using i18n libraries.",

  "How to store formatted chatbot responses?":
    "Formatted responses can be stored as Markdown or sanitized HTML and rendered using markdown or HTML parsers.",

  "How to scale static chatbot to millions of users?":
    "Scaling requires backend APIs, NLP models, distributed caching, vector databases, and cloud infrastructure."
};