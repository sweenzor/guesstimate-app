import React from 'react'

import Icon from'react-fa'

import * as navigationActions from 'gModules/navigation/actions'

import * as Space from 'gEngine/space'
import * as User from 'gEngine/user'
import * as Organization from 'gEngine/organization'

import {formatDescription, formatDate} from 'gComponents/spaces/shared'

import arrowsVisibleImage from '../../../assets/metric-icons/blue/arrows-visible.png'

import './style.css'

const BlankScreenshot = () => (
  <div className='snapshot blank'>
    <img src={arrowsVisibleImage}/>
  </div>
)

const SingleButton = ({isPrivate}) => (
  <div className='tag'>
    <Icon name={isPrivate ? 'lock' : 'globe'}/>
  </div>
)

const ButtonArea = ({owner, ownerUrl, isPrivate, showPrivacy}) => (
  <div className='hover-row'>
    {owner &&
      <a href={ownerUrl} className='owner-tag'>
        {!!owner.picture &&
          <img
            className='avatar'
            src={owner.picture}
          />
        }
        <div className='name'>
          {owner.name}
        </div>
      </a>
    }
    {showPrivacy && <SingleButton isPrivate={isPrivate}/>}
  </div>
)

const SpaceCard = ({space, showPrivacy}) => {
  const hasName = !_.isEmpty(space.name)
  const hasOrg = _.has(space, 'organization.name')

  const owner = hasOrg ? space.organization : space.user
  const ownerUrl = hasOrg ? Organization.url(space.organization) : User.url(space.user)

  const spaceUrl = Space.url(space)
  const navigateToSpace = () => {navigationActions.navigate(spaceUrl)}

  return (
    <div className='col-xs-12 col-md-4 SpaceCard'>
      <div className='SpaceCard--inner' onClick={navigateToSpace}>
        <div className={`header ${hasName ? '' : 'default-name'}`}>
          <a href={spaceUrl}><h3>{hasName ? space.name : 'Untitled Model'}</h3></a>
          <div className='changed-at'>Updated {formatDate(space.updated_at)}</div>
        </div>

        <div className='image'>
          <BlankScreenshot/>
          <a href={spaceUrl}><img src={space.big_screenshot}/></a>
          <ButtonArea
            owner={owner}
            ownerUrl={ownerUrl}
            isPrivate={space.is_private}
            showPrivacy={showPrivacy}
          />
        </div>
        <div className='body'>
          <p> {formatDescription(space.description)} </p>
        </div>
      </div>
    </div>
  )
}

const SpaceCards = ({spaces, showPrivacy}) => (
  <div className='row'>
    {_.map(spaces, (s) =>
        <SpaceCard
          key={s.id}
          space={s}
          showPrivacy={showPrivacy}
        />
    )}
  </div>
)

export default SpaceCards