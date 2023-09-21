import Realm from "realm";
import {User} from "./schemas/user"

export const getRealm = async () => await Realm.open({
    schema: [User]
})
