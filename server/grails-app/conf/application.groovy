

// Added by the Spring Security Core plugin:
grails.plugin.springsecurity.userLookup.userDomainClassName = 'com.nexmatix.User'
grails.plugin.springsecurity.userLookup.authorityJoinClassName = 'com.nexmatix.UserRole'
grails.plugin.springsecurity.authority.className = 'com.nexmatix.Role'
grails.plugin.springsecurity.rest.login.endpointUrl = '/api/login'
grails.plugin.springsecurity.controllerAnnotations.staticRules = [
	[pattern: '/',               access: ['permitAll']],
	[pattern: '/api/login',         access: ['permitAll']],
	[pattern: '/error',          access: ['permitAll']],
	[pattern: '/index',          access: ['permitAll']],
	[pattern: '/index.gsp',      access: ['permitAll']],
	[pattern: '/shutdown',       access: ['permitAll']],
	[pattern: '/assets/**',      access: ['permitAll']],
	[pattern: '/**/js/**',       access: ['permitAll']],
	[pattern: '/**/css/**',      access: ['permitAll']],
	[pattern: '/**/images/**',   access: ['permitAll']],
	[pattern: '/**/favicon.ico', access: ['permitAll']]
]

grails.plugin.springsecurity.filterChain.chainMap = [
	//Stateless chain
	[
	        pattern: '/api/**',
			filters: 'JOINED_FILTERS,' +
					'-anonymousAuthenticationFilter,' +
					'-exceptionTranslationFilter,' +
					'-authenticationProcessingFilter,' +
					'-securityContextPersistenceFilter,' +
					'-rememberMeAuthentiicationFilter'
	],
	//Traditional chain
	[
	        pattern: '/**',
			filters: 'JOINED_FILTERS,' +
					'-restTokenValdiationFilter,' +
					'-restExceptionTranslationFilter'
	]
]

