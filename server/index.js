import "dotenv";
import server from "./app.js";

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
    console.info(`🚀 Server is now running on http://localhost:${PORT}`);
});
