module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "sendgrid",
      providerOptions: {
        apiKey: env("SENDGRID_API_KEY"),
      },
      settings: {
        defaultFrom: "samimfazlu091@gmail.com",
        defaultReplyTo: "samimfazlu091@gmail.com",
      },
    },
  },
});
