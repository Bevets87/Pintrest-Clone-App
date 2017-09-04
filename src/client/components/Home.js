import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import Masonry from 'react-masonry-component'

import Box from 'grommet/components/Box'
import Paragraph from 'grommet/components/Paragraph'
import Button from 'grommet/components/Button'
import FavoriteIcon from 'grommet/components/icons/base/Favorite'
import Animate from 'grommet/components/Animate'

class Home extends Component {
  constructor (props) {
    super (props)
  }
  render () {
    const { photos } = this.props
    return (
      <Animate enter={{
        'animation':'fade',
        'duration': 1000,
        'delay': 0}} keep={true}>
        {photos.length > 0 &&
          <Masonry >
            {photos.map(photo => {
              return (
                <div className='grid-item' key={photo._id}>
                  <Box justify='start' direction='row' responsive={false}>
                    <img src={photo.owner.displayPhoto} />
                    <Paragraph style={{
                      'width':'100%',
                      'fontWeight':'bold',
                      'margin':'10px auto',
                      'padding':'0'}}
                      align='center' size='large'>{photo.owner.username}</Paragraph>
                  </Box>
                  <Box>
                    <img src={photo.url} />
                  </Box>
                  <Box>
                    <Paragraph style={{
                      'width':'100%',
                      'padding': '0',
                      'margin':'0 auto',
                      'overflowX':'scroll'
                    }}
                    align='center' size='large'>{photo.text}</Paragraph>
                    <Button fill={true} value={photo._id} className='like-photo-button' icon={<FavoriteIcon/>} label={photo.likes.length.toString()} onClick={this.handleLikePhoto} />
                  </Box>
                </div>
              )
            })}
          </Masonry>
          }

      </Animate>
    )
  }
}

Home.propTypes = {
  photos: PropTypes.array
}

const mapStateToProps = (state) => {
  const { photos } = state.photoReducer
  return {
    photos
  }
}
export default connect(mapStateToProps)(Home)
