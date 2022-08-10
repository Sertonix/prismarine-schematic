/* eslint-env jest */

const { Schematic } = require('prismarine-schematic')
const { Vec3 } = require('vec3')

describe('editing test', () => {
  test('adding and removing blocks', async () => {
    const Version = '1.16'
    const Block = require('prismarine-block')(Version)
    const mcData = require('minecraft-data')(Version)
    const schem = new Schematic(Version, new Vec3(10, 10, 10), new Vec3(0, 0, 0), [], [])
    schem.setBlock(new Vec3(1, 1, 1), new Block(mcData.blocksByName.chest.id, 1, 0))
    schem.setBlock(new Vec3(1, 2, 1), new Block(mcData.blocksByName.dirt.id, 1, 0))
    schem.setBlock(new Vec3(1, 3, 1), new Block(mcData.blocksByName.stone.id, 1, 0))

    expect(schem.getBlock(new Vec3(1, 1, 1)).type).toStrictEqual(mcData.blocksByName.chest.id)
    expect(schem.getBlock(new Vec3(1, 2, 1)).type).toStrictEqual(mcData.blocksByName.dirt.id)
    expect(schem.getBlock(new Vec3(1, 3, 1)).type).toStrictEqual(mcData.blocksByName.stone.id)

    // Now remove some
    schem.setBlock(new Vec3(1, 1, 1), null)
    schem.setBlock(new Vec3(1, 3, 1), null)

    expect(schem.getBlock(new Vec3(1, 1, 1)).type).toStrictEqual(mcData.blocksByName.air.id)
    expect(schem.getBlock(new Vec3(1, 2, 1)).type).toStrictEqual(mcData.blocksByName.dirt.id)
    expect(schem.getBlock(new Vec3(1, 3, 1)).type).toStrictEqual(mcData.blocksByName.air.id)

    expect(schem.palette.filter(b => !!b).length).toStrictEqual(1)
    expect(schem.blocks.filter(b => !!b).length).toStrictEqual(1)
  })
})

