

const routePaths = [
    {
        path: "/",
        methods: ["GET"],
        middlewares: ["anonymous"]
    },
    {
        path: "/nominations",
        methods: ["GET"],
        middlewares: ["anonymous"]
    },
    {
        path: "/awardYear/2010",
        methods: ["GET"],
        middlewares: ["anonymous"]
    },
    {
        path: "/awardYear/2010?lost=true",
        methods: ["GET"],
        middlewares: ["anonymous"]
    },
    {
        path: "/awardYear/2010?won=true",
        methods: ["GET"],
        middlewares: ["anonymous"]
    },
    {
        path: "/nominee/Avatar",
        methods: ["GET"],
        middlewares: ["anonymous"]
    },
    {
        path: "/movie/Blue%20Valentine",
        methods: ["GET"],
        middlewares: ["anonymous"]
    },
    {
        path: "/releaseYear/2010",
        methods: ["GET"],
        middlewares: ["anonymous"]
    },
    {
        path: "/nomination/:id",
        methods: ["GET"],
        middlewares: ["anonymous"]
    }
];

module.exports = routePaths;