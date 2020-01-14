const { Command } = require('discord.js-commando');
const convert = require('convert-units')

// do not judge this mess.
module.exports = class ChooseCommand extends Command {

	constructor(client) {
		const types = [
			'mm',      'cm',      'm',       'km',        'in',      'yd',
			'ft-us',   'ft',      'mi',      'mm2',       'cm2',     'm2',
			'ha',      'km2',     'in2',     'yd2',       'ft2',     'ac',
			'mi2',     'mcg',     'mg',      'g',         'kg',      'mt',
			'oz',      'lb',      't',       'mm3',       'cm3',     'ml',
			'cl',      'dl',      'l',       'kl',        'm3',      'km3',
			'krm',     'tsk',     'msk',     'kkp',       'glas',    'kanna',
			'tsp',     'Tbs',     'in3',     'fl-oz',     'cup',     'pnt',
			'qt',      'gal',     'ft3',     'yd3',       'ea',      'dz',
			'C',       'K',       'F',       'R',         'ns',      'mu',
			'ms',      's',       'min',     'h',         'd',       'week',
			'month',   'year',    'b',       'Kb',        'Mb',      'Gb',
			'Tb',      'B',       'KB',      'MB',        'GB',      'TB',
			'ppm',     'ppb',     'ppt',     'ppq',       'm/s',     'km/h',
			'm/h',     'knot',    'ft/s',    'min/km',    's/m',     'min/mi',
			's/ft',    'Pa',      'kPa',     'MPa',       'hPa',     'bar',
			'torr',    'psi',     'ksi',     'A',         'mA',      'kA',
			'V',       'mV',      'kV',      'W',         'mW',      'kW',
			'MW',      'GW',      'VAR',     'mVAR',      'kVAR',    'MVAR',
			'GVAR',    'VA',      'mVA',     'kVA',       'MVA',     'GVA',
			'Wh',      'mWh',     'kWh',     'MWh',       'GWh',     'J',
			'kJ',      'VARh',    'mVARh',   'kVARh',     'MVARh',   'GVARh',
			'mm3/s',   'cm3/s',   'ml/s',    'cl/s',      'dl/s',    'l/s',
			'l/min',   'l/h',     'kl/s',    'kl/min',    'kl/h',    'm3/s',
			'm3/min',  'm3/h',    'km3/s',   'tsp/s',     'Tbs/s',   'in3/s',
			'in3/min', 'in3/h',   'fl-oz/s', 'fl-oz/min', 'fl-oz/h', 'cup/s',
			'pnt/s',   'pnt/min', 'pnt/h',   'qt/s',      'gal/s',   'gal/min',
			'gal/h',   'ft3/s',   'ft3/min', 'ft3/h',     'yd3/s',   'yd3/min',
			'yd3/h',   'lx',      'ft-cd',   'mHz',       'Hz',      'kHz',
			'MHz',     'GHz',     'THz',     'rpm',       'deg/s',   'rad/s',
			'rad',     'deg',     'grad',    'arcmin',    'arcsec',
		]
		super(client, {
			name: 'convert',
			group: 'basic',
			memberName: 'convert',
            description: 'Converts between units. See here for all units: <https://gitlab.com/qanazoga/hallita/-/wikis/commands/basic/convert>',
			examples: [
				'convert 500 mi km \n`>\t804.67`',
				'convert 525600 min to year \n`>\t1`',
			],

            args: [
				{
					key: 'value',
					label: 'How much of the thing to convert',
                    prompt: 'How much of the thing do you want converted?',
                    type: 'integer|float',
				},
				{
					key: 'firstUnit',
					label: 'The type of the thing',
                    prompt: 'What type is the thing you want converted? (mm, kg, C, year, ml/s etc)',
					type: 'string',
					validate: u => types.includes(u), // oneOf converts to lowercase, which is icky with units, use validate.
				},
				{
					key: 'secondUnit',
					label: 'The type you want it to be',
                    prompt: 'What do you want to convert to?',
					type: 'string',
					validate: u => types.includes(u) || u === 'to', // oneOf converts to lowercase, which is icky with units, use validate.
				},
				{
					key: 'backupSecondUnit',
					label: '_',
                    prompt: 'What do you want to convert to?',
					type: 'string',
					default: '', // If it's hacky, but it works, it works!
					validate: u => types.includes(u) || u === '', // oneOf converts to lowercase, which is icky with units, use validate.
				},
			]
		});
	}

	async run(msg, args) {
		const second = (args.secondUnit === 'to') ? args.backupSecondUnit : args.secondUnit;
		let result = ""
		try {
			result = (convert(args.value).from(args.firstUnit).to(second) * 10).toFixed(1) / 10
		} catch (err) { result = err.message }
		await msg.say(result);
	}	
}
