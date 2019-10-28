module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('appointments', {
      id: {
        type: Sequelize.INTEGER,
        allownull: false,
        autoIncrement: true,
        primarykey: true,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
        allownull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
        unique: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      provider_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allownull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allownull: false,
      },
      canceled_at: {
        type: Sequelize.DATE,
        allownull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('appointments');
  },
};
