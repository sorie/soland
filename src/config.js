let config;

if (process.env.NODE_ENV === "production") {
  config = {
  };
} else {
  config = {
    devicetype : '',

  };
}

export { config }