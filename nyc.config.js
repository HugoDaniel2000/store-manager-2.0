module.exports = {
  all: true,
  extends: '@istanbuljs/nyc-config-typescript',
  exclude: [
    'src/prisma',
    'src/types',
    'src/repositories/interfaces',
  ],
  include: ['src/**/*.ts'],
};
