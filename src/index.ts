#!/usr/bin/env node

import yargs from "yargs/yargs"
import { hideBin } from "yargs/helpers"
import { version as pckgVersion } from "../package.json"

import init from "src/commands/init"
import version from "src/commands/version"
import update from "src/commands/update"
import install from "src/commands/install"
import start from "src/commands/start"
import profileList from "src/commands/profile/list"
import profileDelete from "src/commands/profile/delete"
import profileUse from "src/commands/profile/use"
import profileCreate from "src/commands/profile/create"
import lookup from "src/commands/lookup"
import modsList from "src/commands/mods/list"
import modsUpdate from "src/commands/mods/update"
import modsInstall from "src/commands/mods/install"
import modsUninstall from "src/commands/mods/uninstall"
import cacheView from "src/commands/cache/view"
import cacheClear from "src/commands/cache/clear"
import backupCreate from "src/commands/backup/create"
import backupList from "src/commands/backup/list"
import backupRestore from "src/commands/backup/restore"
import backupDelete from "src/commands/backup/delete"

yargs(hideBin(process.argv))
  .version(pckgVersion)
  .command('version', 'get the currently installed version', (yargs) => yargs
    .option('profile', {
      type: 'string',
      describe: 'the profile to get the version of',
      demandOption: false
    }),
  (rg) => version(rg))
  .command('init <directory>', 'initialize a new mccli managed server', (yargs) => yargs
    .positional('directory', {
      type: 'string',
      describe: 'the directory to initialize',
      demandOption: true
    }),
  (rg) => init(rg))
  .command('update', 'update the currently installed server', (yargs) => yargs,
  (rg) => update(rg))
  .command('install', 'install a new version', (yargs) => yargs,
  (rg) => install(rg))
  .command('start', 'start the server', (yargs) => yargs,
  (rg) => start(rg))
  .command('profile', 'manage profiles', (yargs) => yargs
    .command('list', 'list all profiles', (yargs) => yargs,
    (rg) => profileList(rg))
    .command('delete <profile>', 'delete a profile', (yargs) => yargs
      .positional('profile', {
        type: 'string',
        describe: 'the profile to delete',
        demandOption: true
      }),
    (rg) => profileDelete(rg))
    .command('use <profile>', 'switch to a profile', (yargs) => yargs
      .positional('profile', {
        type: 'string',
        describe: 'the profile to switch to',
        demandOption: true
      }),
    (rg) => profileUse(rg))
    .command('create <name>', 'create a new profile', (yargs) => yargs
      .positional('name', {
        type: 'string',
        describe: 'the profile name to create',
        demandOption: true
      }),
    (rg) => profileCreate(rg))
  )
  .command('mods', 'manage mods', (yargs) => yargs
    .command('list', 'list all mods', (yargs) => yargs,
    (rg) => modsList(rg))
    .command('update', 'update mods', (yargs) => yargs,
    (rg) => modsUpdate(rg))
    .command('install', 'install a mod', (yargs) => yargs,
    (rg) => modsInstall(rg))
    .command('uninstall', 'uninstall a mod', (yargs) => yargs,
    (rg) => modsUninstall(rg))
  )
  .command('cache', 'manage the cache', (yargs) => yargs
    .command('view', 'view the cache', (yargs) => yargs,
    (rg) => cacheView(rg))
    .command('clear', 'clear the cache', (yargs) => yargs,
    (rg) => cacheClear(rg))
  )
  .command('backup', 'manage backups', (yargs) => yargs
    .command('create <name>', 'create a backup', (yargs) => yargs
      .positional('name', {
        type: 'string',
        describe: 'the name of the backup',
        demandOption: true
      })
      .option('method', {
        type: 'string',
        describe: 'the method to use to create the backup',
        choices: ['tar', 'folder'],
        alias: 'm',
        demandOption: true
      })
      .option('override', {
        type: 'boolean',
        describe: 'override an existing backup',
        alias: 'o',
        default: false
      }),
    (rg) => backupCreate(rg))
    .command('list', 'list all backups', (yargs) => yargs,
    (rg) => backupList(rg))
    .command('restore <name>', 'restore a backup', (yargs) => yargs
      .positional('name', {
        type: 'string',
        describe: 'the name of the backup to restore',
        demandOption: true
      })
      .option('clean', {
        type: 'boolean',
        describe: 'clean the current directory before restoring',
        alias: 'c',
        default: false
      }),
    (rg) => backupRestore(rg))
    .command('delete <name>', 'delete a backup', (yargs) => yargs
      .positional('name', {
        type: 'string',
        describe: 'the name of the backup to delete',
        demandOption: true
      }),
    (rg) => backupDelete(rg))
  )
  .command('lookup <player>', 'lookup a player', (yargs) => yargs
    .positional('player', {
      type: 'string',
      describe: 'the player to lookup, can be a username or a UUID',
      demandOption: true
    }),
  (rg) => lookup(rg))
  .strictCommands()
  .demandCommand(1)
  .parse()