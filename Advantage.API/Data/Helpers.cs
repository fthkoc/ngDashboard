using System;
using System.Collections.Generic;

namespace Advantage.API.Data
{
    public class Helpers
    {
        internal static readonly List<string> STATES = new List<string>()
        {
            "AK", "AL","AZ",  "AR", "CA", "CO", "CT", "DE", "FL", "GA",
            "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
            "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
            "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
            "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
        };

        private static readonly List<string> PREFIX_LIST = new List<string>()
        {
            "ABC",
            "XYZ",
            "Acme",
            "MainSt",
            "Ready",
            "Magic",
            "Fluent",
            "Peak",
            "Forward",
            "Enterprise",
            "Sales"
        };

        private static readonly List<string> SUFFIX_LIST = new List<string>()
        {
            "Co",
            "Corp",
            "Holdings",
            "Corporation",
            "Movers",
            "Cleaners",
            "Bakery",
            "Apparel",
            "Rentals",
            "Storage",
            "Transit",
            "Logistics"
        };

        private static Random _random = new Random();

        internal static string GetRandom(IList<string> items)
        {
            return items[_random.Next(items.Count)];
        }

        internal static string MakeUniqueCustomerName(List<string> names)
        {
            int maxNameCount = PREFIX_LIST.Count * SUFFIX_LIST.Count;
            if (names.Count >= maxNameCount)
                throw new System.InvalidOperationException("Maximum number of unique names exceeded");

            var prefix = GetRandom(PREFIX_LIST);
            var suffix = GetRandom(SUFFIX_LIST);
            var businessName = prefix + suffix;

            if (names.Contains(businessName))
                MakeUniqueCustomerName(names);

            return prefix + suffix;
        }

        internal static string MakeCustomerEmail(string name)
        {
            return $"contact@{name.ToLower()}_{DateTime.Now:fff}.com";
        }

        internal static string GetRandomState()
        {
            return GetRandom(STATES);
        }

        internal static decimal GetRandomOrderTotal()
        {
            return _random.Next(100, 5000);
        }

        internal static DateTime GetRandomOrderPlaced()
        {
            var end = DateTime.Now;
            var start = end.AddDays(-90);

            TimeSpan possibleSpan = end - start;
            TimeSpan newSpan = new TimeSpan(0, _random.Next(0, (int) possibleSpan.TotalMinutes), 0);

            return start + newSpan; 
        }

        internal static DateTime? GetRandomOrderCompleted(DateTime orderPlaced)
        {
            var now = DateTime.Now;
            var minLeadTime = TimeSpan.FromDays(7);
            var timePassed = now - orderPlaced;

            if (timePassed < minLeadTime)
                return null;

            return orderPlaced.AddDays(_random.Next(7, 14));
        }
    }
}