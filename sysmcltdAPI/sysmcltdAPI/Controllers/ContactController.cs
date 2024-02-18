using Microsoft.AspNetCore.Mvc;
using sysmcltdAPI.Data;
using sysmcltdAPI.Models;

namespace sysmcltdAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly ContactRepository _contactRepository;
        public ContactController(ContactRepository contactRepository)
        {
            _contactRepository = contactRepository;
        }
        /// <summary>
        /// add contact
        /// </summary>
        /// <param name="contactModel"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult> AddContact([FromBody] AddContact contactModel)
        {
            await _contactRepository.AddContactAsync(contactModel);
            return Ok();
        }
        /// <summary>
        /// Get contact list by customer Id
        /// </summary>
        /// <param name="customerId"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<ActionResult> GetAllContactByCustomerId([FromRoute] int customerId)
        {
            var contactList = await _contactRepository.GetAllContactsByCustomerIdAsync(customerId);
            return Ok(contactList);
        }
        /// <summary>
        /// Update contact
        /// </summary>
        /// <param name="id"></param>
        /// <param name="contactModel"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateContact([FromRoute] int id, [FromBody] UpdateContact contactModel)
        {
            await _contactRepository.UpdateContactAsync(id, contactModel);
            return Ok();
        }
        /// <summary>
        /// Delete contact (logical)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteContact([FromRoute] int id)
        {
            await _contactRepository.DeleteContactAsnyc(id);
            return Ok();
        }
    }
}
