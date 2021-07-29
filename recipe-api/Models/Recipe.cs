using System;
using Microsoft.AspNetCore.Http;
using Google.Cloud.Firestore;

namespace recipe_api.Models
{
    [FirestoreData]
    public class Recipe
    {
        // Unique Identifier
        [FirestoreProperty]
        public string id { get; set; }

        // Recipe Title
        [FirestoreProperty]
        public string Title { get; set; }

        // Recipe Description
        [FirestoreProperty]
        public string Description { get; set; }

        // Recipe Ingredients
        [FirestoreProperty]
        public string Ingredients { get; set; }

        // Recipe Cooking Instructions
        [FirestoreProperty]
        public string Method { get; set; }

        // Recipe Image
        [FirestoreProperty]
        public string Image { get; set; }
    }
}