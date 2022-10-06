module.exports = function(sequelize, dataTypes  ) { 
    let alias = "Users"
    
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,

        },
        nombre:{
            type: dataTypes.STRING

        },
        apellido:{
            type: dataTypes.STRING

        },
        password:{
            type: dataTypes.STRING

        },
        email:{
            type: dataTypes.STRING

        },
        nacimiento:{
            type: dataTypes.DATE

        },
        domicilio:{
            type: dataTypes.STRING

        },
        avatar:{
            type: dataTypes.STRING

        },

        roleId:{
            type: dataTypes.INTEGER,
            defaultValue: 3
        },
    }

    let config = {
        tableName: "users",
        timestamps: false,
    }

    let Users  = sequelize.define(alias, cols, config)

    Users.associate = function (models) {
        Users.belongsTo(models.roles, {
            as: "role",
            foreingnKey: "roleId",
        } )
    };
    return Users;
    }