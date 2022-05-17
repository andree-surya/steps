export default () => ({
  server: {
    port: parseInt(process.env.SERVER_PORT, 10),
  },
  mongo: {
    url: process.env.MONGO_URL,
  },
});
