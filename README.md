# blog19
A minimal blogging system written in typescript, powered by bun.

> ! This software was developed to pass assessments at the [CODE University of Applied Sciences in Berlin](https://code.berlin) and is currently not used in any production environments. You might want to proceed with caution. !

## Usage
The best way to use blog19 is through the bun package runner.

### First install bun

```
curl -fsSL https://bun.sh/install | bash
```

### Create a directory to run your blog in
```
mkdir my-blog && cd my-blog
```

### Run blog19
```
bunx blog19 serve
```
blog19 will automatically generate a sqlite database and a static directory.

The default admin credentials are `admin:admin`

## Configuration
Blog 19 can be configured through command arguments, environment variables and configuration files.

To easily create a configuration file you can run the configuration wizard
```
bunx blog19 config
```

The names of the command arguments are the same as the names of the keys in the config.toml. 

blog19 prioritises configuration based on where it is set. Command arguments overwrite everything, ENV varaibles overwrite the config file, and the config file overwrites defaults.

### Configuration variables
| argument/toml key | ENV_KEY | description | default |
|--------|-------|------------------|------|
|configFile|B19_SQLITE_FILE|Path of sqlite file to use for storing blog posts etc.|EMPTY|
|port|B19_PORT|port to listen for http requests on|3000|
|pageTitle|B19_PAGE_TITLE|title of the blog|Blog|
|adminUser|B19_ADMIN_USER|username for admin account|admin|
|adminPasswordHash|B19_ADMIN_PASSWORD_HASH|argon2 hash of password for admin account|admin|
|sqliteFile|B19_SQLITE_FILE|Path of sqlite file to use for storing blog posts etc.|data.sqlite|
|avatarUrl|B19_AVATAR_URL|Url or path to a profile image to be displayed on the blog (optional)|/static/default-avatar.jpg|
|githubUrl|B19_GITHUB_URL|Url of your github profile (optional)|EMPTY|

## Advanced usage

### Styles
You can edit `static/base.css` to change the style of blog19.

If you fuck up you can alwas revoke your changes by running `bunx blog19 overwrite-css`

### HTTPS
blog19 is designed to run behind some kind of proxy that terminates HTTPS. Check out [Caddy](https://caddyserver.com/) or soemthing similar.

### Version safety
It might make sense to explicitly define what version of blog19 you want to use by running blog19 like `bunx blog10@<verion> ...`


