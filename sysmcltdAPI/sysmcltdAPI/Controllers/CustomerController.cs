using Microsoft.AspNetCore.Mvc;
using sysmcltdAPI.Data;
using sysmcltdAPI.Models;

namespace sysmcltdAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly CustomerRepository _customerRepository;

        public CustomerController(CustomerRepository customerRepository)
        {
            _customerRepository = customerRepository;
        }
        /// <summary>
        /// Add customer
        /// </summary>
        /// <param name="customerModel"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult> AddCustomer([FromBody] AddCustomer customerModel)
        {
            await _customerRepository.AddCustomerAsync(customerModel);
            return Ok();
        }
        /// <summary>
        /// Get customer list
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult> GetCustomerList()
        {
            var customerList = await _customerRepository.GetAllCustomersAsync();
            return Ok(customerList);
        }
        /// <summary>
        /// Get customer by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<ActionResult> GetCustomerDataById([FromRoute] int id)
        {
            var customer = await _customerRepository.GetCustomerDataByIdAsync(id);
            return Ok(customer);
        }
        /// <summary>
        /// Update customer
        /// </summary>
        /// <param name="id"></param>
        /// <param name="customerModel"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateCustomer([FromRoute] int id, [FromBody] UpdateCustomer customerModel)
        {
            await _customerRepository.UpdateCustomerAsync(id, customerModel);
            return Ok();
        }
        /// <summary>
        /// Delete customer (logical)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCustomer([FromRoute] int id)
        {
            await _customerRepository.DeleteCustomerAsnyc(id);
            return Ok();
        }
    }
}
