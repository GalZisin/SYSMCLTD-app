using Microsoft.AspNetCore.Mvc;
using sysmcltdAPI.Data;
using sysmcltdAPI.Models;

namespace sysmcltdAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressController : ControllerBase
    {
        private readonly AddressRepository _addressRepository;
        public AddressController(AddressRepository addressRepository)
        {
            _addressRepository = addressRepository;
        }
        /// <summary>
        /// Add address
        /// </summary>
        /// <param name="addressModel"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult> AddAddress([FromBody] AddAddress addressModel)
        {
            await _addressRepository.AddAddressAsync(addressModel);
            return Ok();
        }
        /// <summary>
        /// Get all addresses by cjustome Id
        /// </summary>
        /// <param name="customerId"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<ActionResult> GetAllAddressesByCustomerId([FromRoute] int customerId)
        {
            var contactList = await _addressRepository.GetAllAddressesByCustomerIdAsync(customerId);
            return Ok(contactList);
        }
        /// <summary>
        /// Update address
        /// </summary>
        /// <param name="id"></param>
        /// <param name="addressModel"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateAddress([FromRoute] int id, [FromBody] UpdateAddress addressModel)
        {
            await _addressRepository.UpdateAddressAsync(id, addressModel);
            return Ok();
        }
        /// <summary>
        /// Delete address (logical)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAddress([FromRoute] int id)
        {
            await _addressRepository.DeleteAddressAsnyc(id);
            return Ok();
        }
    }
}
