using System.ComponentModel.DataAnnotations.Schema;

namespace sysmcltdAPI.Models
{
    public class Address
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string? City { get; set; }
        public string? Street { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime Created { get; set; }
        public int CustomerId { get; set; }
        //navigation properties
        public Customer? Customer { get; set; }
    }

    public class AddAddress
    {
        public required string City { get; set; }
        public required string Street { get; set; }
        public int CustomerId { get; set; }
    }

    public class UpdateAddress
    {
        public string? City { get; set; }
        public string? Street { get; set; }
    }
}
