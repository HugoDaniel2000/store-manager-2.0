module.exports = {
  all: true,
  extends: '@istanbuljs/nyc-config-typescript',
  exclude: [
    'src/prisma',
  ],
  include: ['src/**/*.ts'],
};
