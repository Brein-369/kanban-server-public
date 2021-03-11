'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert("Categories", [{
        name : "backlog",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : "todo",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : "doing",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : "done",
        createdAt : new Date(),
        updatedAt : new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Categories", null )
  }
};
