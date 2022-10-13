﻿using Application.Abstract;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repository
{
    public class MedalRepository : IMedalRepository
    {
        private readonly ApplicationDbContext _context;

        public MedalRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task CreateMedal(Medal medal)
        {
            await _context.Medals.AddAsync(medal);
        }

        public async Task<List<Medal>> GetAllMedals(int userId)
        {
            var result = await _context.Medals.Where(m => m.UserId == userId).ToListAsync();

            return result;
        }

        public async Task<List<Medal>> GetUserMedalsInMarathon(int userId, int marathonId)
        {
            var result = await _context.Medals
                 .Where(m => m.UserId == userId && m.MarathonId == marathonId)
                 .ToListAsync();

            return result;
        }
    }
}
