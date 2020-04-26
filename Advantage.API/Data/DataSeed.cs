using System;
using System.Collections.Generic;
using System.Linq;
using Advantage.API.Models;

namespace Advantage.API.Data
{
    public class DataSeed
    {
        private readonly DataContext _dataContext;

        public DataSeed(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public void SeedData(int numberOfCustomers, int numberOfOrders)
        {
            if (!_dataContext.Customers.Any()) {
                 SeedCustomers(numberOfCustomers);
                _dataContext.SaveChanges();
            }

            if (!_dataContext.Orders.Any())
            {
                SeedOrders(numberOfOrders);
                _dataContext.SaveChanges();
            }

            if (!_dataContext.Servers.Any())
            {
                SeedServers();
                _dataContext.SaveChanges();
            }
        }

        private void SeedCustomers(int numberOfCustomers)
        {
            List<Customer> customers = BuildCustomerList(numberOfCustomers);
            
            foreach (var customer in customers)
            {
                _dataContext.Customers.Add(customer);
            }
        }

        private void SeedOrders(int numberOfOrders)
        {
            List<Order> orders = BuildOrderList(numberOfOrders);
            
            foreach (var order in orders)
            {
                _dataContext.Orders.Add(order);
            }
        }

        private void SeedServers()
        {
            List<Server> servers = BuildServerList();

            foreach (var server in servers)
            {
                _dataContext.Servers.Add(server);
            }
        }

        private List<Customer> BuildCustomerList(int numberOfCustomers)
        {
            var customers = new List<Customer>();
            var names = new List<string>();
            
            for (int i = 1; i <= numberOfCustomers; i++)
            {
                var name = Helpers.MakeUniqueCustomerName(names);
                names.Add(name);
                customers.Add(new Customer {
                    ID = i,
                    Name = name,
                    Email = Helpers.MakeCustomerEmail(name),
                    State = Helpers.GetRandomState()
                });
            }

            return customers;
        }

        private List<Order> BuildOrderList(int numberOfOrders)
        {
            var orders = new List<Order>();
            var random = new Random();
            
            for (int i = 1; i <= numberOfOrders; i++)
            {
                var randomCustomerID = random.Next(1, _dataContext.Customers.Count());
                var placed = Helpers.GetRandomOrderPlaced();
                var completed = Helpers.GetRandomOrderCompleted(placed);

                orders.Add(new Order {
                    ID = i,
                    Customer = _dataContext.Customers.First(c => c.ID == randomCustomerID),
                    Total = Helpers.GetRandomOrderTotal(),
                    TimePlaced = placed,
                    TimeCompleted = completed
                });
            }

            return orders;
        }

        internal static List<Server> BuildServerList()
        {
            return new List<Server>()
            {
                new Server
                {
                    ID = 1,
                    Name = "Dev-Web",
                    IsOnline = true
                },

                new Server
                {
                    ID = 2,
                    Name = "Dev-Analysis",
                    IsOnline = true
                },

                new Server
                {
                    ID = 3,
                    Name = "Dev-Mail",
                    IsOnline = true
                },

                new Server
                {
                    ID = 4,
                    Name = "QA-Web",
                    IsOnline = true
                },

                new Server
                {
                    ID = 5,
                    Name = "QA-Analysis",
                    IsOnline = true
                },

                new Server
                {
                    ID = 6,
                    Name = "QA-Mail",
                    IsOnline = true
                },

                new Server
                {
                    ID = 7,
                    Name = "Prod-Web",
                    IsOnline = true
                },

                new Server
                {
                    ID = 8,
                    Name = "Prod-Analysis",
                    IsOnline = true
                },

                new Server
                {
                    ID = 9,
                    Name = "Prod-Mail",
                    IsOnline = true
                },
            };
        }
    }
}