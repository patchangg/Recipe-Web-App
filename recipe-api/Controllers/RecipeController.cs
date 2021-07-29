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
            //CollectionReference recipesCollection = db.Collection("RecipeWebApp");
            //Query allRecipesQuery = recipesCollection.WhereGreaterThanOrEqualTo("Title", "te");
            //List<List<string>> Recipes = new List<List<string>>();
            List<Recipe> Recipes = new List<Recipe>();
            QuerySnapshot allRecipesQuerySnapshot = await allRecipesQuery.GetSnapshotAsync();
            //Recipe[] Recipes = new Recipe[] {};
            foreach (DocumentSnapshot documentSnapshot in allRecipesQuerySnapshot)
            {
                Console.WriteLine(documentSnapshot);
                Console.WriteLine("Document data for {0} document:", documentSnapshot.Id);
                List<string> recipeDocument = new List<string>();
                //DocumentSnapshot test =
                Recipe docuRecipe = documentSnapshot.ConvertTo<Recipe>();
                docuRecipe.id = documentSnapshot.Id;
                Console.WriteLine("Hello", docuRecipe.id);
                // docuRecipe.id = documentSnapshot.Id;
                // recipeDocument.Add(documentSnapshot.Id);
                // Dictionary<string, object> city = documentSnapshot.ToDictionary();
                // foreach (KeyValuePair<string, object> pair in city)
                // {
                //     Console.WriteLine("{0}: {1}", pair.Key, pair.Value);
                //     recipeDocument.Add((string)pair.Value);
                //     //docuRecipe.pair.Key = (string)pair.Value;
                // }
                Recipes.Add(docuRecipe);
                Console.WriteLine("");
            }
            //return NoContent();
            return Recipes;
            //return await _context.Recipes.ToListAsync();
        }

        // GET: api/Recipe/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Recipe>> GetRecipe(String id)
        {
            // var recipe = await _context.Recipes.FindAsync(id);

            // if (recipe == null)
            // {
            //     return NotFound();
            // }

            // return recipe;
            string path = @"RWPfirebase.json";
            Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS",path);
            FirestoreDb db = FirestoreDb.Create("recipe-web-app-64a48");
            DocumentReference docuRef = db.Collection("RecipeWebApp").Document(id);
            //List<List<string>> Recipes = new List<List<string>>();
            DocumentSnapshot snap = await docuRef.GetSnapshotAsync();
            if (snap.Exists){
                Recipe Recipes = snap.ConvertTo<Recipe>(); 
                Recipes.id = id;
                return Recipes;
            } else {
                return NoContent();
            }
            //return NoContent();
            // return Recipes;
            //return await _context.Recipes.ToListAsync();
        }

        // PUT: api/Recipe/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRecipe(String id, Recipe recipe)
        {
            // if (id != recipe.id)
            // {
            //     return BadRequest();
            // }

            // _context.Entry(recipe).State = EntityState.Modified;

            // try
            // {
            //     await _context.SaveChangesAsync();
            // }
            // catch (DbUpdateConcurrencyException)
            // {
            //     if (!RecipeExists(id))
            //     {
            //         return NotFound();
            //     }
            //     else
            //     {
            //         throw;
            //     }
            // }
            Console.WriteLine(recipe.Title);
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
            
            //DocumentReference docRef = await db.Collection("RecipeWebApp").AddAsync(newRecipe);
            return NoContent();
        }

        // POST: api/Recipe
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Recipe>> PostRecipe(Recipe recipe)
        {

            // _context.Recipes.Add(recipe);
            // await _context.SaveChangesAsync();

            // return CreatedAtAction("GetRecipe", new { id = recipe.id }, recipe);
            Console.WriteLine(recipe.Title);
            string path = @"RWPfirebase.json";
            Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS",path);
            FirestoreDb db = FirestoreDb.Create("recipe-web-app-64a48");
            //DocumentReference docRef = db.Collection("RecipeWebApp");
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
            // var recipe = await _context.Recipes.FindAsync(id);
            // if (recipe == null)
            // {
            //     return NotFound();
            // }

            // _context.Recipes.Remove(recipe);
            // await _context.SaveChangesAsync();
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

        private bool RecipeExists(Guid id)
        {
            return true;
            //return _context.Recipes.Any(e => e.id == id);
        }
    }
}
