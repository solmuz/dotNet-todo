using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApp.api.Data;
using TodoApp.api.Models;

namespace TodoApp.api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TodoController : ControllerBase
{
  private readonly AppDbContext _db;

  public TodoController (AppDbContext db)=> _db = db;
  //GET /api/todo - regresa toda la lista de todo items 
  [HttpGet]
  public async Task<IActionResult> GetAll()=>
    Ok(await _db.TodoItems.ToListAsync());

  //GET /api/todo/[ID] - regresa un item todo por su primary key.
  [HttpGet("{id}")]
  public async Task<IActionResult> GetById(int id)
  {
    var item = await _db.TodoItems.FindAsync(id);
    return item is null ? NotFound() : Ok(item);
  }
  //POST /api/todo - crea un nuevo todo item 
  [HttpPost]
  public async Task<IActionResult> Create(TodoItem item)
  {
    _db.TodoItems.Add(item);
    await _db.SaveChangesAsync();
    return CreatedAtAction(nameof(GetById), new {id = item.Id}, item);
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> Update(int id, TodoItem updated)
  {
    var item = await _db.TodoItems.FindAsync(id);
    if (item is null) return NotFound();

    item.Title = updated.Title;
    item.Description = updated.Description;
    item.IsComplete = updated.IsComplete;

    if (updated.IsComplete && item.CompletedAt is null)
      item.CompletedAt = DateTime.UtcNow;

    await _db.SaveChangesAsync();
    return NoContent();
  }

  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(int id)
  {
    var item = await _db.TodoItems.FindAsync(id);
    if (item is null) return NotFound();

    _db.TodoItems.Remove(item);
    await _db.SaveChangesAsync();
    return NoContent();
  }

}
