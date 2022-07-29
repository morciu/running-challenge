﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClassLibrary1
{
    public class UserMenu : IMenu
    {
        public void DisplayMenu()
        {
            Console.WriteLine("\nUser Menu\n");
            Console.WriteLine($"Current User: {UserManager.currentUser.UserName}");
            if (UserManager.currentUser.activity == null)
            {
                Console.WriteLine("1.Start Marathon\n2.Start Shared Marathon with another user\n0.Exit");
            }
            else
            {
                Console.WriteLine("1.Register activity\n2.Check Marathon progress\n0.Exit");
            }
        }

        public string GetInput()
        {
            while (true)
            {
                string? input = Console.ReadLine();
                if (input == "1" || input == "2" || input == "0")
                {
                    return input;
                }
            }
        }

        public string GetState()
        {
            return "userMenu";
        }

        public void SwitchMenu(string input, ref IMenu menu)
        {
            throw new NotImplementedException();
        }
    }
}
