using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using recipe_api.Models;
using Google.Cloud.Firestore;

namespace recipe_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        private readonly DataContext _context;

        public RecipeController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Recipe
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Recipe>>> GetRecipes()
        {
            string path = @"RWPfirebase.json";
            Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS",path);
            FirestoreDb db = FirestoreDb.Create("recipe-web-app-64a48");
            Query allRecipesQuery = db.Collection("RecipeWebApp");
            List<Recipe> Recipes = new List<Recipe>();
            QuerySnapshot allRecipesQuerySnapshot = await allRecipesQuery.GetSnapshotAsync();
            foreach (DocumentSnapshot documentSnapshot in allRecipesQuerySnapshot)
            {
                List<string> recipeDocument = new List<string>();
                Recipe docuRecipe = documentSnapshot.ConvertTo<Recipe>();
                docuRecipe.id = documentSnapshot.Id;
                Recipes.Add(docuRecipe);
            }
            return Recipes;
        }

        // GET: api/Recipe/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Recipe>> GetRecipe(String id)
        {

            string path = @"RWPfirebase.json";
            Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS",path);
            FirestoreDb db = FirestoreDb.Create("recipe-web-app-64a48");
            DocumentReference docuRef = db.Collection("RecipeWebApp").Document(id);
            DocumentSnapshot snap = await docuRef.GetSnapshotAsync();
            if (snap.Exists){
                Recipe Recipes = snap.ConvertTo<Recipe>(); 
                Recipes.id = id;
                return Recipes;
            } else {
                return NoContent();
            }
        }

        // PUT: api/Recipe/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRecipe(String id, Recipe recipe)
        {
            string path = @"RWPfirebase.json";
            Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS",path);
            FirestoreDb db = FirestoreDb.Create("recipe-web-app-64a48");
            DocumentReference docuRef = db.Collection("RecipeWebApp").Document(id);
            Dictionary<string, object> updatedRecipe = new Dictionary<string, object>
            {
                { "Title", recipe.Title },
                { "Description", recipe.Description },
                { "Image", recipe.Image },
                { "Ingredients", recipe.Ingredients },
                { "Method", recipe.Method }
            };
            DocumentSnapshot snap = await docuRef.GetSnapshotAsync();
            if (snap.Exists) {
                await docuRef.SetAsync(updatedRecipe);
            }
            
            return NoContent();
        }

        // POST: api/Recipe
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Recipe>> PostRecipe(Recipe recipe)
        {
            string path = @"RWPfirebase.json";
            Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS",path);
            FirestoreDb db = FirestoreDb.Create("recipe-web-app-64a48");
            Dictionary<string, object> newRecipe = new Dictionary<string, object>
            {
                { "Title", recipe.Title },
                { "Description", recipe.Description },
                { "Image", recipe.Image },
                { "Ingredients", recipe.Ingredients },
                { "Method", recipe.Method }
            };
            DocumentReference docRef = await db.Collection("RecipeWebApp").AddAsync(newRecipe);

            return NoContent();
        }

        // DELETE: api/Recipe/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecipe(String id)
        {
            string path = @"RWPfirebase.json";
            Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS",path);
            FirestoreDb db = FirestoreDb.Create("recipe-web-app-64a48");
            DocumentReference docuRef = db.Collection("RecipeWebApp").Document(id);
            DocumentSnapshot snap = await docuRef.GetSnapshotAsync();
            if (snap.Exists) {
                await docuRef.DeleteAsync();
            }
            return NoContent();
        }

    }
}
