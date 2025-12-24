--
-- PostgreSQL database dump
--
\ restrict scL5Jf5nzx0J6Vt6aYdgeljHOPhshd2msMKB1uwbbw5tfGp9A74GejkAjJOTwH5 -- Dumped from database version 17.7 (Debian 17.7-3.pgdg13+1)
-- Dumped by pg_dump version 17.7 (Debian 17.7-3.pgdg13+1)
SET
    statement_timeout = 0;

SET
    lock_timeout = 0;

SET
    idle_in_transaction_session_timeout = 0;

SET
    transaction_timeout = 0;

SET
    client_encoding = 'UTF8';

SET
    standard_conforming_strings = on;

SELECT
    pg_catalog.set_config('search_path', '', false);

SET
    check_function_bodies = false;

SET
    xmloption = content;

SET
    client_min_messages = warning;

SET
    row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: root
--
-- *not* creating schema, since initdb creates it
ALTER SCHEMA public OWNER TO root;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: root
--
COMMENT ON SCHEMA public IS '';

SET
    default_tablespace = '';

SET
    default_table_access_method = heap;

--
-- Name: budget_periods; Type: TABLE; Schema: public; Owner: root
--
CREATE TABLE public.budget_periods (
    id integer NOT NULL,
    year integer NOT NULL,
    month integer NOT NULL,
    name character varying(255) NOT NULL
);

ALTER TABLE
    public.budget_periods OWNER TO root;

--
-- Name: budget_periods_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--
CREATE SEQUENCE public.budget_periods_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER SEQUENCE public.budget_periods_id_seq OWNER TO root;

--
-- Name: budget_periods_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--
ALTER SEQUENCE public.budget_periods_id_seq OWNED BY public.budget_periods.id;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: root
--
CREATE TABLE public.categories (
    id integer NOT NULL,
    user_id integer NOT NULL,
    name character varying(255) NOT NULL,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(6) with time zone,
    deleted_at timestamp(6) with time zone
);

ALTER TABLE
    public.categories OWNER TO root;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--
CREATE SEQUENCE public.categories_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER SEQUENCE public.categories_id_seq OWNER TO root;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--
ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;

--
-- Name: fixed_releases; Type: TABLE; Schema: public; Owner: root
--
CREATE TABLE public.fixed_releases (
    id integer NOT NULL,
    categories_id integer NOT NULL,
    value numeric(10, 2) NOT NULL,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(6) with time zone,
    deleted_at timestamp(6) with time zone,
    start_date timestamp(6) with time zone,
    end_date timestamp(6) with time zone
);

ALTER TABLE
    public.fixed_releases OWNER TO root;

--
-- Name: fixed_releases_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--
CREATE SEQUENCE public.fixed_releases_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER SEQUENCE public.fixed_releases_id_seq OWNER TO root;

--
-- Name: fixed_releases_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--
ALTER SEQUENCE public.fixed_releases_id_seq OWNED BY public.fixed_releases.id;

--
-- Name: realeases; Type: TABLE; Schema: public; Owner: root
--
CREATE TABLE public.realeases (
    id integer NOT NULL,
    category_id integer NOT NULL,
    budget_period_id integer NOT NULL,
    value double precision NOT NULL,
    name character varying(255) NOT NULL,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(6) with time zone,
    deleted_at timestamp(6) with time zone,
    start_date timestamp(6) with time zone,
    end_date timestamp(6) with time zone
);

ALTER TABLE
    public.realeases OWNER TO root;

--
-- Name: realeases_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--
CREATE SEQUENCE public.realeases_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER SEQUENCE public.realeases_id_seq OWNER TO root;

--
-- Name: realeases_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--
ALTER SEQUENCE public.realeases_id_seq OWNED BY public.realeases.id;

--
-- Name: roles; Type: TABLE; Schema: public; Owner: root
--
CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);

ALTER TABLE
    public.roles OWNER TO root;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--
CREATE SEQUENCE public.roles_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER SEQUENCE public.roles_id_seq OWNER TO root;

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--
ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;

--
-- Name: status; Type: TABLE; Schema: public; Owner: root
--
CREATE TABLE public.status (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);

ALTER TABLE
    public.status OWNER TO root;

--
-- Name: status_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--
CREATE SEQUENCE public.status_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER SEQUENCE public.status_id_seq OWNER TO root;

--
-- Name: status_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--
ALTER SEQUENCE public.status_id_seq OWNED BY public.status.id;

--
-- Name: users; Type: TABLE; Schema: public; Owner: root
--
CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role_id integer NOT NULL,
    status_id integer NOT NULL,
    last_login_at timestamp(6) with time zone,
    email_verified boolean DEFAULT false,
    email_verification_token character varying(6),
    email_verification_expires_at timestamp(6) with time zone,
    reset_password_token character varying(6),
    reset_password_expires_at timestamp(6) with time zone,
    updated_at timestamp(6) with time zone,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP,
    failed_login_attempts integer DEFAULT 0,
    refresh_token_hash character varying(255)
);

ALTER TABLE
    public.users OWNER TO root;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--
CREATE SEQUENCE public.users_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER SEQUENCE public.users_id_seq OWNER TO root;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--
ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;

--
-- Name: budget_periods id; Type: DEFAULT; Schema: public; Owner: root
--
ALTER TABLE
    ONLY public.budget_periods
ALTER COLUMN
    id
SET
    DEFAULT nextval('public.budget_periods_id_seq' :: regclass);

--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: root
--
ALTER TABLE
    ONLY public.categories
ALTER COLUMN
    id
SET
    DEFAULT nextval('public.categories_id_seq' :: regclass);

--
-- Name: fixed_releases id; Type: DEFAULT; Schema: public; Owner: root
--
ALTER TABLE
    ONLY public.fixed_releases
ALTER COLUMN
    id
SET
    DEFAULT nextval('public.fixed_releases_id_seq' :: regclass);

--
-- Name: realeases id; Type: DEFAULT; Schema: public; Owner: root
--
ALTER TABLE
    ONLY public.realeases
ALTER COLUMN
    id
SET
    DEFAULT nextval('public.realeases_id_seq' :: regclass);

--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: root
--
ALTER TABLE
    ONLY public.roles
ALTER COLUMN
    id
SET
    DEFAULT nextval('public.roles_id_seq' :: regclass);

--
-- Name: status id; Type: DEFAULT; Schema: public; Owner: root
--
ALTER TABLE
    ONLY public.status
ALTER COLUMN
    id
SET
    DEFAULT nextval('public.status_id_seq' :: regclass);

--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: root
--
ALTER TABLE
    ONLY public.users
ALTER COLUMN
    id
SET
    DEFAULT nextval('public.users_id_seq' :: regclass);

--
-- Name: budget_periods budget_periods_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--
ALTER TABLE
    ONLY public.budget_periods
ADD
    CONSTRAINT budget_periods_pkey PRIMARY KEY (id);

--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--
ALTER TABLE
    ONLY public.categories
ADD
    CONSTRAINT categories_pkey PRIMARY KEY (id);

--
-- Name: fixed_releases fixed_releases_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--
ALTER TABLE
    ONLY public.fixed_releases
ADD
    CONSTRAINT fixed_releases_pkey PRIMARY KEY (id);

--
-- Name: realeases realeases_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--
ALTER TABLE
    ONLY public.realeases
ADD
    CONSTRAINT realeases_pkey PRIMARY KEY (id);

--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--
ALTER TABLE
    ONLY public.roles
ADD
    CONSTRAINT roles_pkey PRIMARY KEY (id);

--
-- Name: status status_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--
ALTER TABLE
    ONLY public.status
ADD
    CONSTRAINT status_pkey PRIMARY KEY (id);

--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--
ALTER TABLE
    ONLY public.users
ADD
    CONSTRAINT users_pkey PRIMARY KEY (id);

--
-- Name: idx_categories_user_id; Type: INDEX; Schema: public; Owner: root
--
CREATE INDEX idx_categories_user_id ON public.categories USING btree (user_id);

--
-- Name: idx_fixed_releases_categories_id; Type: INDEX; Schema: public; Owner: root
--
CREATE INDEX idx_fixed_releases_categories_id ON public.fixed_releases USING btree (categories_id);

--
-- Name: idx_realeases_budget_period_id; Type: INDEX; Schema: public; Owner: root
--
CREATE INDEX idx_realeases_budget_period_id ON public.realeases USING btree (budget_period_id);

--
-- Name: idx_realeases_category_id; Type: INDEX; Schema: public; Owner: root
--
CREATE INDEX idx_realeases_category_id ON public.realeases USING btree (category_id);

--
-- Name: idx_users_email; Type: INDEX; Schema: public; Owner: root
--
CREATE INDEX idx_users_email ON public.users USING btree (email);

--
-- Name: idx_users_role_id; Type: INDEX; Schema: public; Owner: root
--
CREATE INDEX idx_users_role_id ON public.users USING btree (role_id);

--
-- Name: idx_users_status_id; Type: INDEX; Schema: public; Owner: root
--
CREATE INDEX idx_users_status_id ON public.users USING btree (status_id);

--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: root
--
CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);

--
-- Name: realeases fk_budget_period; Type: FK CONSTRAINT; Schema: public; Owner: root
--
ALTER TABLE
    ONLY public.realeases
ADD
    CONSTRAINT fk_budget_period FOREIGN KEY (budget_period_id) REFERENCES public.budget_periods(id) ON DELETE RESTRICT;

--
-- Name: fixed_releases fk_category_fixed_release; Type: FK CONSTRAINT; Schema: public; Owner: root
--
ALTER TABLE
    ONLY public.fixed_releases
ADD
    CONSTRAINT fk_category_fixed_release FOREIGN KEY (categories_id) REFERENCES public.categories(id) ON DELETE RESTRICT;

--
-- Name: realeases fk_category_release; Type: FK CONSTRAINT; Schema: public; Owner: root
--
ALTER TABLE
    ONLY public.realeases
ADD
    CONSTRAINT fk_category_release FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE RESTRICT;

--
-- Name: users fk_role; Type: FK CONSTRAINT; Schema: public; Owner: root
--
ALTER TABLE
    ONLY public.users
ADD
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES public.roles(id);

--
-- Name: users fk_status; Type: FK CONSTRAINT; Schema: public; Owner: root
--
ALTER TABLE
    ONLY public.users
ADD
    CONSTRAINT fk_status FOREIGN KEY (status_id) REFERENCES public.status(id);

--
-- Name: categories fk_user_category; Type: FK CONSTRAINT; Schema: public; Owner: root
--
ALTER TABLE
    ONLY public.categories
ADD
    CONSTRAINT fk_user_category FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;

--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: root
--
REVOKE USAGE ON SCHEMA public
FROM
    PUBLIC;

--
-- PostgreSQL database dump complete
--
\ unrestrict scL5Jf5nzx0J6Vt6aYdgeljHOPhshd2msMKB1uwbbw5tfGp9A74GejkAjJOTwH5