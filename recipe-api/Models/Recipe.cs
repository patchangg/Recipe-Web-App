using System;

namespace recipe_api.Models
{
    public class Recipe
    {
        // Unique Identifier
        public Guid id { get; set; }

        // Recipe Title
        public string title { get; set; }

        // Recipe Description
        public string description { get; set; }

        // Recipe Ingredients
        public string ingredients { get; set; }

        // Recipe Cooking Instructions
        public string method { get; set; }

        // Recipe Image
        public string image { get; set; }
    }
}