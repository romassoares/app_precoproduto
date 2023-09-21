export class User extends Realm.Object  {    
    static schema = {
        name: "User",
        primaryKey: "_id",
        properties: {
            _id: "objectId",
            name: "string?",
            email: "string",
            access_token: "string",
            created_at: "date",
        },
    }
}