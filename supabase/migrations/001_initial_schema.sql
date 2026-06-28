-- ArtVista Database Schema

-- Artworks table
create table if not exists public.artworks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  artist text not null,
  category text not null default 'Paintings',
  price numeric not null default 0,
  status text not null default 'Draft' check (status in ('Published', 'Draft')),
  image_url text,
  medium text,
  views integer not null default 0,
  sales integer not null default 0,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Activity log table
create table if not exists public.activity_log (
  id uuid primary key default gen_random_uuid(),
  action text not null,
  detail text not null default '',
  created_at timestamptz not null default now()
);

-- Site stats table (key-value for dashboard)
create table if not exists public.site_stats (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value text not null default '0',
  change text not null default '0',
  up boolean not null default true
);

-- Enable RLS
alter table public.artworks enable row level security;
alter table public.activity_log enable row level security;
alter table public.site_stats enable row level security;

-- Public read access for artworks (published only for public, all for authenticated)
create policy "Anyone can view published artworks"
  on public.artworks for select
  using (status = 'Published' or auth.role() = 'authenticated');

-- Authenticated users can insert/update/delete artworks
create policy "Authenticated users can insert artworks"
  on public.artworks for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update artworks"
  on public.artworks for update
  to authenticated
  using (true);

create policy "Authenticated users can delete artworks"
  on public.artworks for delete
  to authenticated
  using (true);

-- Public read access for activity log
create policy "Anyone can view activity log"
  on public.activity_log for select
  using (true);

-- Authenticated users can insert activity log
create policy "Authenticated users can insert activity"
  on public.activity_log for insert
  to authenticated
  with check (true);

-- Public read access for site stats
create policy "Anyone can view site stats"
  on public.site_stats for select
  using (true);

-- Authenticated users can update site stats
create policy "Authenticated users can update site stats"
  on public.site_stats for update
  to authenticated
  using (true);

-- Create storage bucket for artwork images
insert into storage.buckets (id, name, public)
values ('artwork-images', 'artwork-images', true)
on conflict (id) do nothing;

-- Allow public read access to artwork images
create policy "Public can view artwork images"
  on storage.objects for select
  using (bucket_id = 'artwork-images');

-- Allow authenticated users to upload artwork images
create policy "Authenticated users can upload artwork images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'artwork-images');

-- Allow authenticated users to delete artwork images
create policy "Authenticated users can delete artwork images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'artwork-images');

-- Seed initial data
insert into public.artworks (title, artist, category, price, status, image_url, medium, views, sales, featured) values
  ('Violet Horizon', 'Maya Chen', 'Paintings', 2400, 'Published', 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=400&fit=crop', 'Oil on Canvas', 980, 5, true),
  ('Ethereal Dreams', 'Lucas Rivera', 'Digital', 1800, 'Published', 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&h=400&fit=crop', 'Digital Art', 870, 3, true),
  ('Abstract Flow', 'Aisha Patel', 'Paintings', 3200, 'Draft', 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&h=400&fit=crop', 'Acrylic', 450, 1, true),
  ('Neon Pulse', 'David Kim', 'Digital', 950, 'Published', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop', 'Digital Art', 870, 8, false),
  ('Golden Hour', 'Sofia Laurent', 'Photography', 1200, 'Published', 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=400&fit=crop', 'Photography', 650, 2, false),
  ('Marble Whisper', 'Takeshi Mori', 'Sculpture', 5500, 'Draft', 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=600&h=400&fit=crop', 'Marble', 1240, 3, false),
  ('Prism Light', 'Elena Voss', 'Mixed Media', 2100, 'Published', 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=600&h=400&fit=crop', 'Mixed Media', 320, 1, false),
  ('Coastal Serenity', 'James Okafor', 'Paintings', 1650, 'Published', 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop', 'Watercolor', 280, 0, false),
  ('Binary Bloom', 'Mia Zhang', 'Digital', 780, 'Published', 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=600&h=400&fit=crop', 'Digital Art', 190, 0, false);

insert into public.activity_log (action, detail, created_at) values
  ('New artwork added', 'Violet Horizon by Maya Chen', now() - interval '2 hours'),
  ('Sale completed', 'Ethereal Dreams - $1,800', now() - interval '5 hours'),
  ('New inquiry', 'From collector James W.', now() - interval '8 hours'),
  ('Exhibit updated', 'Spring Collection 2026', now() - interval '1 day'),
  ('New artist registered', 'Sofia Laurent - Photography', now() - interval '2 days');

insert into public.site_stats (key, value, change, up) values
  ('Total Revenue', '$24,500', '+12.5%', true),
  ('Page Views', '18,240', '+8.2%', true),
  ('Artworks Listed', '156', '+3', true),
  ('Conversion Rate', '3.2%', '-0.4%', false);
