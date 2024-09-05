module.exports = (env, argv) => {
  return {
    mode: "production",
    output: {
      filename: argv.name,
    },
  };
};
