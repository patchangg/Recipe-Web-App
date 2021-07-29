using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
using recipe_api.Models;
using Firebase.Database;
using Firebase.Database.Query;
using Google.Cloud.Firestore;

namespace recipe_api.Controllers
{
    [Route("api/recipe/[controller]")]
    [ApiController]
    public class FilterController : ControllerBase
    {
        private readonly DataContext _context;

        public FilterController(DataContext context)
        {
            _context = context;
        }

        // GET: api/recipe/{filter}
        [HttpGet("{Filter}")]
        public async Task<ActionResult<IEnumerable<Recipe>>> GetFilteredRecipes(String Filter)
        {
            Console.WriteLine("This is working!", Filter);
            string path = @"RWPfirebase.json";
            Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS",path);
            FirestoreDb db = FirestoreDb.Create("recipe-web-app-64a48");
            CollectionReference recipesCollection = db.Collection("RecipeWebApp");
            Query allRecipesQuery = recipesCollection.WhereGreaterThanOrEqualTo("Title", Filter);
            List<Recipe> Recipes = new List<Recipe>();
            QuerySnapshot allRecipesQuerySnapshot = await allRecipesQuery.GetSnapshotAsync();
            foreach (DocumentSnapshot documentSnapshot in allRecipesQuerySnapshot)
            {
                List<string> recipeDocument = new List<string>();
                Recipe docuRecipe = documentSnapshot.ConvertTo<Recipe>();
                docuRecipe.id = documentSnapshot.Id;
                Recipes.Add(docuRecipe);
            }
            //return NoContent();
            return Recipes;
        }
    }
}
