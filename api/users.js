const fs = require("fs");
const path = require("path");

module.exports = function (req, res) {
    try {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const offset = parseInt(url.searchParams.get("offset")) || 0;
        const limit = parseInt(url.searchParams.get("limit")) || 50;

        const filePath = path.join(
            process.cwd(),
            "static",
            "data",
            "users.json",
        );

        const fileData = fs.readFileSync(filePath, "utf8");
        const users = JSON.parse(fileData);

        if (offset >= users.length) {
            return res
                .setHeader("Content-Type", "application/json")
                .status(200)
                .end(
                    JSON.stringify({
                        data: [],
                        totalUsers: users.length,
                        offset: offset,
                        page: 1,
                        totalPages: 0,
                    }),
                );
        }

        const endIndex = Math.min(offset + limit, users.length);

        const paginatedUsers = users.slice(offset, endIndex);

        const page = Math.floor(offset / limit) + 1;

        const totalPages = Math.ceil(users.length / limit);

        const response = {
            data: paginatedUsers,
            pagination: {
                offset: offset,
                limit: limit,
                page: page,
                totalPages: totalPages,
                totalUsers: users.length,
                hasMore: endIndex < users.length,
            },
        };

        res.setHeader("Content-Type", "application/json");
        res.statusCode = 200;
        res.end(JSON.stringify(response));
    } catch (error) {
        console.error(error);
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 500;
        res.end(
            JSON.stringify({
                error: "Internal Server Error",
                message: error.message,
            }),
        );
    }
};
