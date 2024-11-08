import Hash "mo:base/Hash";

import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Time "mo:base/Time";

actor PhoneShop {
    // Phone type definition
    public type Phone = {
        id: Text;
        name: Text;
        description: Text;
        price: Nat;
        image: Text;
        storage: Text;
        color: Text;
        url: Text;
    };

    // Stable variable to store phones
    private stable var phones : [Phone] = [
        {
            id = "iphone-13-pro";
            name = "iPhone 13 Pro";
            description = "Apple's flagship phone with Pro camera system";
            price = 999;
            image = "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-family-hero?wid=940&hei=1112&fmt=png-alpha&.v=1631220221000";
            storage = "128GB";
            color = "Sierra Blue";
            url = "https://www.apple.com/shop/buy-iphone/iphone-13-pro"
        },
        {
            id = "iphone-13";
            name = "iPhone 13";
            description = "A total powerhouse with A15 Bionic chip";
            price = 799;
            image = "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-family-hero?wid=940&hei=1112&fmt=png-alpha&.v=1631220221000";
            storage = "128GB";
            color = "Midnight";
            url = "https://www.apple.com/shop/buy-iphone/iphone-13"
        },
        {
            id = "samsung-s21";
            name = "Samsung Galaxy S21";
            description = "Epic camera, epic performance";
            price = 799;
            image = "https://images-na.ssl-images-amazon.com/images/I/81kfA-GtWwL._AC_SL1500_.jpg";
            storage = "256GB";
            color = "Phantom Gray";
            url = "https://www.amazon.com/Samsung-Galaxy-S21-5G-256GB/dp/B08N3BYNDN"
        }
    ];

    // Query call to get all phones
    public query func getPhones() : async [Phone] {
        return phones;
    };

    // Query call to search phones by name
    public query func searchPhones(searchTerm: Text) : async [Phone] {
        let searchTermLower = Text.toLowercase(searchTerm);
        return Array.filter<Phone>(phones, func (phone) {
            let nameLower = Text.toLowercase(phone.name);
            Text.contains(nameLower, #text searchTermLower)
        });
    };

    // Query call to get a specific phone by ID
    public query func getPhone(id: Text) : async ?Phone {
        Array.find<Phone>(phones, func (phone) {
            phone.id == id
        })
    };
}
