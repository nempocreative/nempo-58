CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;
CREATE POLICY "own roles readable" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE TABLE public.banners (id bigserial PRIMARY KEY, title text, subtitle text, description text, image text, link text, btn_text text, accent text, category text, sort_order int DEFAULT 0, active boolean DEFAULT true, created_at timestamptz DEFAULT now(), updated_at timestamptz DEFAULT now());
CREATE TABLE public.berita (id bigserial PRIMARY KEY, title text, slug text, summary text, content text, image text, category text, author text, source_name text, source_url text, photo_source text, location text, event_date text, published_at timestamptz DEFAULT now(), featured boolean DEFAULT false, active boolean DEFAULT true, status text, submitter_name text, submitter_email text, created_at timestamptz DEFAULT now(), updated_at timestamptz DEFAULT now());
CREATE TABLE public.community_applications (id bigserial PRIMARY KEY, full_name text NOT NULL, email text NOT NULL, whatsapp text NOT NULL, interest text NOT NULL, hobby text, reason text, origin_type text, origin_name text, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE public.digital_services (id bigserial PRIMARY KEY, title text, description text, category text, image text, price numeric, whatsapp text, featured boolean DEFAULT false, active boolean DEFAULT true, created_at timestamptz DEFAULT now(), updated_at timestamptz DEFAULT now());
CREATE TABLE public.events (id bigserial PRIMARY KEY, name text, title text, slug text UNIQUE, description text, category text, image text, banner_image text, date text, date_end text, time_start text, time_end text, location text, maps_url text, organizer text, organizer_ig text, price numeric, service_fee_percent numeric, visitors int, featured boolean DEFAULT false, active boolean DEFAULT true, allow_voucher boolean DEFAULT false, crew_active boolean DEFAULT false, guest_stars jsonb, menu_items jsonb, payment_info jsonb, prohibited_items jsonb, rundown jsonb, transportation_info jsonb, created_at timestamptz DEFAULT now(), updated_at timestamptz DEFAULT now());
CREATE TABLE public.event_tickets (id bigserial PRIMARY KEY, event_id bigint REFERENCES public.events(id) ON DELETE CASCADE, name text, description text, price numeric, quota int, sold int DEFAULT 0, sale_start text, sale_end text, sort_order int DEFAULT 0, active boolean DEFAULT true, created_at timestamptz DEFAULT now());
CREATE TABLE public.influencers (id bigserial PRIMARY KEY, name text, handle text, bio text, location text, instagram text, tiktok text, rate text, rating numeric, color text, color2 text, niches text[], photos text[], verified boolean DEFAULT false, sort_order int DEFAULT 0, active boolean DEFAULT true, created_at timestamptz DEFAULT now(), updated_at timestamptz DEFAULT now());
CREATE TABLE public.kamus_sunda (id bigserial PRIMARY KEY, sunda text, latin text, indonesia text, example text, category text, level text, active boolean DEFAULT true, created_at timestamptz DEFAULT now(), updated_at timestamptz DEFAULT now());
CREATE TABLE public.kuliner (id bigserial PRIMARY KEY, name text, slug text, description text, category text, image text, photos text, location text, google_maps_url text, maps_embed_url text, hours text, phone text, instagram text, website text, facilities text, price_range text, rating numeric, featured boolean DEFAULT false, reservasi_enabled boolean DEFAULT false, active boolean DEFAULT true, created_at timestamptz DEFAULT now(), updated_at timestamptz DEFAULT now());
CREATE TABLE public.media_archive (id text PRIMARY KEY, manifest jsonb NOT NULL DEFAULT '{}'::jsonb, updated_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE public.partners (id bigserial PRIMARY KEY, name text, color text, sort_order int DEFAULT 0, active boolean DEFAULT true, created_at timestamptz DEFAULT now(), updated_at timestamptz DEFAULT now());
CREATE TABLE public.penginapan (id bigserial PRIMARY KEY, name text, slug text, description text, category text, image text, location text, instagram text, amenities text[], price_per_night numeric, rating numeric, featured boolean DEFAULT false, booking_enabled boolean DEFAULT false, active boolean DEFAULT true, created_at timestamptz DEFAULT now(), updated_at timestamptz DEFAULT now());
CREATE TABLE public.perlombaan (id bigserial PRIMARY KEY, name text, description text, category text, image text, date text, location text, organizer text, fee numeric, prize numeric, max_peserta int, featured boolean DEFAULT false, active boolean DEFAULT true, created_at timestamptz DEFAULT now());
CREATE TABLE public.price_list (id bigserial PRIMARY KEY, item text, description text, category text, price numeric, sort_order int DEFAULT 0, active boolean DEFAULT true, created_at timestamptz DEFAULT now(), updated_at timestamptz DEFAULT now());
CREATE TABLE public.promo_banners (id bigserial PRIMARY KEY, image text, link text, sort_order int DEFAULT 0, active boolean DEFAULT true, created_at timestamptz DEFAULT now(), updated_at timestamptz DEFAULT now());
CREATE TABLE public.site_settings (key text PRIMARY KEY, value text, updated_at timestamptz DEFAULT now());
CREATE TABLE public.talents (id bigserial PRIMARY KEY, name text, role text, tagline text, bio text, category text, photo text, instagram text, wa text, tags text[], verified boolean DEFAULT false, featured boolean DEFAULT false, sort_order int DEFAULT 0, active boolean DEFAULT true, created_at timestamptz DEFAULT now(), updated_at timestamptz DEFAULT now());
CREATE TABLE public.transportasi (id bigserial PRIMARY KEY, name text, kode text, type text, asal text, tujuan text, via text, jam text, frekuensi text, tarif numeric, description text, active boolean DEFAULT true, created_at timestamptz DEFAULT now(), updated_at timestamptz DEFAULT now());
CREATE TABLE public.vouchers (id bigserial PRIMARY KEY, code text, title text, description text, type text, applicable_type text, discount_type text, discount_value numeric, min_purchase numeric, required_points int, expiry_date text, kuliner_id bigint, mitra_id bigint, active boolean DEFAULT true, created_at timestamptz DEFAULT now(), updated_at timestamptz DEFAULT now());
CREATE TABLE public.wisata (id bigserial PRIMARY KEY, name text, slug text, description text, category text, image text, photos text, location text, google_maps_url text, maps_embed_url text, opening_hours text, phone text, instagram text, website text, facilities text, entry_fee numeric, rating numeric, partner boolean DEFAULT false, active boolean DEFAULT true, created_at timestamptz DEFAULT now(), updated_at timestamptz DEFAULT now());

DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['banners','berita','community_applications','digital_services','events','event_tickets','influencers','kamus_sunda','kuliner','media_archive','partners','penginapan','perlombaan','price_list','promo_banners','site_settings','talents','transportasi','vouchers','wisata'] LOOP
    EXECUTE format('GRANT SELECT, INSERT, UPDATE, DELETE ON public.%I TO authenticated', t);
    EXECUTE format('GRANT ALL ON public.%I TO service_role', t);
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('CREATE POLICY "admin manage" ON public.%I FOR ALL TO authenticated USING (public.has_role(auth.uid(), ''admin'')) WITH CHECK (public.has_role(auth.uid(), ''admin''))', t);
  END LOOP;
  FOREACH t IN ARRAY ARRAY['banners','digital_services','events','event_tickets','influencers','kamus_sunda','kuliner','media_archive','partners','penginapan','perlombaan','price_list','promo_banners','talents','transportasi','vouchers','wisata'] LOOP
    EXECUTE format('GRANT SELECT ON public.%I TO anon', t);
    EXECUTE format('CREATE POLICY "public read" ON public.%I FOR SELECT TO anon, authenticated USING (true)', t);
  END LOOP;
END $$;

GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated, service_role;

-- News: public may read only non-contact columns
GRANT SELECT (id,title,slug,summary,content,image,category,author,source_name,source_url,photo_source,location,event_date,published_at,featured,active,status,created_at,updated_at) ON public.berita TO anon;
CREATE POLICY "public read" ON public.berita FOR SELECT TO anon USING (true);

-- Community applications: anyone may submit
GRANT INSERT ON public.community_applications TO anon;
GRANT USAGE ON SEQUENCE public.community_applications_id_seq TO anon;
CREATE POLICY "anyone can apply" ON public.community_applications FOR INSERT TO anon, authenticated
  WITH CHECK (length(full_name) BETWEEN 1 AND 200 AND length(email) BETWEEN 3 AND 320 AND length(whatsapp) BETWEEN 5 AND 40);